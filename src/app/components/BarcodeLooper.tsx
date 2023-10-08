import { useEffect, useState } from 'react';
var QRCode = require('qrcode')

interface Props {
    fileDataArr: string[] | null;
    displayTime: number;
    displayRange: number[];
}

export default function BarcodeLooper({ fileDataArr, displayTime, displayRange }: Props) {
    const canvasId = 'qrcode-zone';
    const [currentDisplayIdx, setCurrentDisplayIdx] = useState<number>(0);

    useEffect(() => {
        if (fileDataArr && fileDataArr.length > 0) {
            const intervalId = setInterval(() => {
                renderChunkOnCanvas(canvasId, fileDataArr[currentDisplayIdx]);
                setCurrentDisplayIdx((prevIdx) => (prevIdx + 1) % fileDataArr.length);
            }, displayTime);
            return () => clearInterval(intervalId);
        }
    }, [currentDisplayIdx, fileDataArr, displayTime]);

    return (
        <div>
            {fileDataArr && fileDataArr.length > 0 && <div>
                <canvas id={canvasId}></canvas>
                <div>{currentDisplayIdx + 1}/{fileDataArr.length}</div>
                <br></br>
            </div>}
        </div>
    );
}

function renderChunkOnCanvas(canvasId: string, chunk: string) {
    const canvas = document.getElementById(canvasId)
    if (canvas) {
        QRCode.toCanvas(canvas, chunk, {
            errorCorrectionLevel: 'M', width: 320
        }, function (error: any) {
            if (error) console.error(error)
        })
    }
}