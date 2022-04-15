# nfc-poll-wrapper

Are you tired of trying to just read your NFC data from Node.JS? All other modules are outdated, not working or not
installing while `nfc-poll` works just fine?

Yeah, me too.

## Requirements

This requires [stdbuf][1] to be available on your system (aside from `nfc-poll`).

## Usage:

```javascript
import { poll } from `nfc-poll-wrapper`;

const instance = poll();

instance.on("device", ({ raw, UID, NFCIDversion }: DeviceInfo) => {
    console.info("Device ID:", UID, "v", NFCIDversion);
});
```

> Only UID is extracted currently, feel free to change and/or open a PR or a request.
> Use `raw` if you need to extract data ASAP without forking this repo.

## Events:

- device - emitted when device info is detected
- state - (usually not needed) - emitted when lifecycle state is changed, ie: process starting, process reported it is
polling for device, waiting for releasing the device, etc, see exported `State` for available states
- process-exit - (usually not needed) - just an info that underlying process exited
- process-error - (usually not needed) - `stdbuf` is probably not installed, read first argument (an Error) to verify
details

## Docs?

Proper docs will come someday (or not).

## License

MIT.

[1]: https://command-not-found.com/stdbuf
