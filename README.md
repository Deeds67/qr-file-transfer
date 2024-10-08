## QR-File-Transfer explained

This is a small app (original idea from a friend @vanrohan) that allows you to upload/download files without an internet connection and without the files being shared with a 3rd party. The app converts a file into a series of QR codes. These QR codes can be scanned on a different device. Once all codes are scanned, the original file has been successfully transferred. The obvious caveat being that QR barcodes cannot hold much data, so transferring large files would take a very long time. Nevertheless, it was a fun little project.

## Trying the app

https://qr-file-transfer.vercel.app/

## Running the app locally

You'll need to have `npm` installed on your machine.

```bash
npm install
npm run dev
```

This will run the app on [http://localhost:3000](http://localhost:3000)
