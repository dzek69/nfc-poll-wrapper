import type { DeviceInfo } from "./index.js";
import { poll } from "./index.js";

console.info("BOOT");

const mock = process.argv[2] === "mock";
const instance = mock
    ? poll("node", ["./test/nfc-poll.mock.js"])
    : poll();

instance.on("process-exit", (code) => {
    console.info("nfc-poll exited", code);
});
instance.on("state", (state) => {
    console.info("State", state);
});
instance.on("device", ({ raw, UID, NFCIDversion }: DeviceInfo) => {
    console.info("Device info:", UID, "v", NFCIDversion);
});
