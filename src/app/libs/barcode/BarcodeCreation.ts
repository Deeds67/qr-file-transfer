var QRCode = require('qrcode')


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