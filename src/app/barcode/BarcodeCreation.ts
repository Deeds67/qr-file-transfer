import { compressArrayBufferToBase64String } from '../compression/Compression';
var QRCode = require('qrcode')

async function readFileAsArrayBuffer(file: File) {
    return file.arrayBuffer();
}

export function readFileData(file: File) {
    return readFileAsArrayBuffer(file).then(arrayBuffer => {
        const base64 = compressArrayBufferToBase64String(arrayBuffer);
        return base64;
    });
}

export function startQRGeneration(file: File, maxChunkSize: number, displayTime: number) {
    return readFileAsArrayBuffer(file).then(arrayBuffer => {
        const base64 = compressArrayBufferToBase64String(arrayBuffer);
        return base64;
    });
}

export function renderChunkOnCanvas(chunk: string, qrZone: HTMLCanvasElement | null) {
    if (qrZone) {
        QRCode.toCanvas(qrZone, chunk, {
            errorCorrectionLevel: 'M', width: 320
        }, function (error: any) {
            if (error) console.error(error)
            // console.log('success!');
        })
    }
}