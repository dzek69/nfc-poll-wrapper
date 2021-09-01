# nfc-poll-wrapper

Are you tired of trying to just read your NFC data from Node.JS? All other modules are outdated, not working or not
installing while `nfc-poll` works just fine?

Yeah, me too.

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

## Docs?

Proper docs will come someday (or not).

## License

MIT.
