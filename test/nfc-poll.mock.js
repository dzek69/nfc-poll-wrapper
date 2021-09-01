const wait = t => new Promise((resolve, reject) => {
    setTimeout(() => { resolve(); }, t);
});

(async () => {
    process.stdout.write(`nfc-poll uses libnfc 1.8.0
NFC reader: Doorbell opened
NFC device will poll during 36000 ms (20 pollings of 300 ms for 6 modulations)
`);

    await wait(1000);

    process.stdout.write(`ISO/IEC 14443A (106 kbps) target:
    ATQA (SENS_RES): 00  04
* UID size: single
* bit frame anticollision supported
       UID (NFCID3): 11  ff  ff  22
* Random UID
      SAK (SEL_RES): 20
* Compliant with ISO/IEC 14443-4
* Not compliant with ISO/IEC 18092
                ATS: 80  82  84  86
* Max Frame Size accepted by PICC: 256 bytes
* Bit Rate Capability:
  * Same bitrate in both directions mandatory
* Frame Waiting Time: 38.66 ms
* No Start-up Frame Guard Time required
* Node Address not supported
* Card IDentifier supported

Fingerprinting based on MIFARE type Identification Procedure:
* MIFARE Plus (4 Byte UID or 4 Byte RID) 2K, Security level 3
* MIFARE Plus (4 Byte UID or 4 Byte RID) 4K, Security level 3
* SmartMX with MIFARE 1K emulation
Other possible matches based on ATQA & SAK values:
`);

    await wait(1000);

    process.stdout.write(`Waiting for card removing...`);

    await wait(1000);
    process.stderr.write(`nfc_initiator_target_is_present: Target Released`);

    await wait(1000);
    process.stdout.write(`
done.`);
})();

