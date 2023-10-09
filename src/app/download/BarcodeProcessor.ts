
const FPS = 32;    // Set FPS processing speed here! Parameterize?

export default function runScanLoop(webWorkers: Worker[], currentWorkerIdx: number, video: HTMLVideoElement, canvasElement: HTMLCanvasElement, canvas: CanvasRenderingContext2D, then: number) {
    var now: number = Date.now();

    var loadingMessage = document.getElementById("loadingMessage");

    if (loadingMessage) loadingMessage.innerText = "⌛ Loading video..."
    if (video.readyState === video.HAVE_ENOUGH_DATA) {
        if (loadingMessage) loadingMessage.hidden = true;
        canvasElement.hidden = false;
        canvasElement.height = video.videoHeight;
        canvasElement.width = video.videoWidth;
        canvas.drawImage(video, 0, 0, canvasElement.width, canvasElement.height);
        now = Date.now();
        var elapsed = now - then;
        if (elapsed > (1000 / FPS)) {
            then = now - (elapsed % (1000 / FPS));
            // var imageDataBuffer = canvas.getImageData(0, 0, canvasElement.width, canvasElement.height).data.buffer;
            var imageData = canvas.getImageData(0, 0, canvasElement.width, canvasElement.height);
            // console.log('Posting imageData to worker #', currentWorkerIdx, 'FPS: ', FPS);
            webWorkers[currentWorkerIdx].postMessage(imageData);
            if (currentWorkerIdx + 1 >= webWorkers.length) {
                currentWorkerIdx = 0;
            }
            else {
                currentWorkerIdx = currentWorkerIdx + 1;
            }
        }
    }
    requestAnimationFrame(e => runScanLoop(webWorkers, currentWorkerIdx, video, canvasElement, canvas, then));
}