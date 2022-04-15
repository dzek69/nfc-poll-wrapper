import type { DeviceInfo } from "./index";

enum State {
    IDLE = "IDLE",
    STARTING = "STARTING",
    STARTED = "STARTED",
    POLLING = "POLLING",
    WAITING_FOR_RELEASE = "WAITING_FOR_RELEASE",
    DONE = "DONE",
}

type EEvents = {
    device: (data: DeviceInfo) => void;
    state: (state: State) => void;
    "process-exit": (code: number | null) => void;
    "process-error": (e: Error) => void;
};

export {
    State,
};

export type { EEvents };

