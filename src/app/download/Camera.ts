
export default function getCameraAccess(video: HTMLVideoElement) {
    navigator.mediaDevices.getUserMedia({ audio: false, video: { facingMode: "environment" } }).then(function (stream) {
        video.srcObject = stream;
        video.setAttribute("playsinline", "true"); // required to tell iOS safari we don't want fullscreen
        video.play();
    });
}