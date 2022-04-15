import { spawn } from "child_process";
import EventEmitter from "eventemitter3";
import type TypedEmitter from "typed-emitter";

import type { NFCData } from "./extractNfcData";
import type { EEvents } from "./types";
import { State } from "./types.js";
import { extractNfcData } from "./extractNfcData.js";

interface DeviceInfo extends NFCData {
    raw: string;
}

const ERROR_SPAWN_TIMEOUT = 1000;
const SUCCESS_SPAWN_TIMEOUT = 0;

const WILL_POLL = /will poll during \d+ ms \(\d+ pollings of \d+ ms for \d+ modulations\)/;
const WAITING = "Waiting for card removing...";

class NFCPoll extends (EventEmitter as unknown as new () => TypedEmitter<EEvents>) {
    private _state: State;

    private _process?: ReturnType<typeof spawn>;

    private _collectedResponse: string = "";

    private readonly _opts: { command: string; args: string[] };

    public constructor(opts: { command: string; args: string[]}) {
        // eslint-disable-next-line constructor-super
        super();
        this._opts = opts;

        this._state = State.IDLE;
        setTimeout(() => {
            this._spawn();
        }); // allow events to be attached before first spawn
    }

    private _spawn() {
        this._process = spawn("stdbuf", ["-o0", "-e0", this._opts.command, ...this._opts.args], {});
        this._collectedResponse = "";
        this.state = State.STARTING;

        // @TODO test if stdout is available, if not, complain early?

        // @TODO after "Waiting(...)..." there is stderr output:
        // nfc_initiator_target_is_present: Target Released
        // or
        // nfc_initiator_target_is_present: RF Transmission Error
        // maybe something more? - handle it

        // eslint-disable-next-line max-statements
        this._process.stdout?.on("data", (data) => {
            this._collectedResponse += String(data);
            if (this.state === State.STARTING || this.state === State.STARTED) {
                if (WILL_POLL.exec(this._collectedResponse)) {
                    this.state = State.POLLING;
                }
            }

            if (this.state === State.POLLING) {
                if (this._collectedResponse.includes(WAITING)) {
                    const m = WILL_POLL.exec(this._collectedResponse);
                    this.state = State.WAITING_FOR_RELEASE;

                    if (m) { // should always be true at this point anyway
                        const responseStartPoint = m.index + m[0].length;
                        const responseEndPont = this._collectedResponse.indexOf(WAITING);
                        const nfcData = this._collectedResponse.substring(responseStartPoint, responseEndPont).trim();
                        this.emit("device", {
                            raw: nfcData,
                            ...extractNfcData(nfcData),
                        });
                    }
                }
            }

            if (this.state === State.WAITING_FOR_RELEASE) {
                if (this._collectedResponse.trim().endsWith("done.")) {
                    this.state = State.DONE;
                }
            }
        });

        this._process.on("spawn", () => {
            this.state = State.STARTED;
        });

        this._process.on("close", (code) => {
            this.state = State.IDLE;
            this.emit("process-exit", code);
            const timeout = code ? ERROR_SPAWN_TIMEOUT : SUCCESS_SPAWN_TIMEOUT;
            setTimeout(() => { this._spawn(); }, timeout);
        });

        this._process.on("error", (e: Error) => {
            this.emit("process-error", e);
        });
    }

    public get state() {
        return this._state;
    }

    private set state(state: State) {
        this._state = state;
        this.emit("state", state);
    }
}

let nfc: NFCPoll;

const poll = (command = "nfc-poll", args = ["-v"]) => {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (!nfc) {
        nfc = new NFCPoll({ command, args });
    }

    return nfc;
};

export {
    poll,
    State,
};

export type {
    DeviceInfo,
    NFCPoll,
};
