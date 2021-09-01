interface NFCData {
    UID: Buffer | null;
    NFCIDversion: number | null;
}

const extractNfcData = (data: string) => {
    let UID: NFCData["UID"] = null,
        NFCIDversion: NFCData["NFCIDversion"] = null;

    const m = /^\s*UID \(NFCID(\d+)\): ([0-9a-f ]+)/m.exec(data);
    if (m) {
        const k = m[2].split(" ").map(s => s.trim()).filter(Boolean);
        UID = Buffer.from(k.map(i => parseInt(i, 16)));

        NFCIDversion = Number(m[1]);
    }

    return {
        UID,
        NFCIDversion,
    };
};

export {
    extractNfcData,
};

export type {
    NFCData,
};
