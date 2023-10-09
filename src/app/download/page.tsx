"use client";

import React, { MutableRefObject, useEffect, useRef, useState } from "react";
import { decompressBase64StringToArrayBuffer } from "../libs/compression/Compression";
import getCameraAccess from "./Camera";
import runScanLoop from "./BarcodeProcessor";
import { Button, Progress } from "@material-tailwind/react";

const Download = () => {
    const [chunks, setChunk] = useState<Map<number, string>>(new Map());
    const [totalChunks, setTotalChunks] = useState<number | null>();
    const [fileName, setFileName] = useState<string>();
    const [fileContent, setFileContent] = useState<any | null>(null);
    const [webWorkers, setWebWorkers] = useState<Worker[]>();
    const [fileDownloaded, setFileDownloaded] = useState<boolean>(false);

    const canvasElement: MutableRefObject<HTMLCanvasElement | null> = useRef(null);
    const loadingMessage = useRef(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const downloadButton = useRef<HTMLButtonElement>(null);

    // let workerCount = (navigator.hardwareConcurrency - 1) || 4;  // TODO: Improve... tried navigator.hardwareConcurrency but had issues on mobile
    let workerCount = 1;

    useEffect(() => {
        setWebWorkers(Array.from((new Array(workerCount)).keys()).map(x => new Worker('./workers/imageWorker.js')));
    }, []);

    function resetState(): void {
        setChunk(new Map());
        setTotalChunks(null);
        setFileName("");
        setFileContent(null);
        setFileDownloaded(false);
    }

    useEffect(() => {
        console.log("Registering web worker feedback handlers");
        if (webWorkers) {
            webWorkers.map(x => x.onmessage = (event: MessageEvent) => {
                if (event && event.data) {
                    // "fileName.txt|0/13|ey12312312312"
                    // "1/13|ey3333333"
                    const split = event.data.split("|");
                    const containsFileInfo = split.length === 3;
                    const chunkCounterIndex = containsFileInfo ? 1 : 0;
                    const progressSection = split[chunkCounterIndex].split("/");
                    const index = parseInt(progressSection[0]);
                    setChunk(map => {
                        if (map.has(index)) {
                            return map;
                        } else {
                            console.log("updating chunks with new map and index ", index)
                            const base64Index = containsFileInfo ? 2 : 1;
                            const base64 = split[base64Index];
                            return new Map([...map, [index, base64]]);
                        }
                    });
                    if (!totalChunks) {
                        const total = parseInt(progressSection[1]);
                        setTotalChunks(currentTotal => (currentTotal !== total + 1) ? total + 1 : currentTotal);
                    }
                    if (!fileName && containsFileInfo) {
                        setFileName(split[0]);
                    }
                }
            });
        }
        // eslint-disable-next-line
    }, [webWorkers]);

    // When we have all of the chunks, we aggregate all of the content, uncompress it, and set the fileContent state
    useEffect(() => {
        if (chunks.size === totalChunks) {
            var combinedBase64 = '';
            for (let i = 0; i < chunks.size; i++) {
                combinedBase64 = combinedBase64 + chunks.get(i);
            }
            const uncompressed = decompressBase64StringToArrayBuffer(combinedBase64)
            setFileContent(uncompressed);
        }
    }, [chunks, totalChunks]);

    // When the fileContent is set, we set the button's onClick to download the file.
    useEffect(() => {
        if (fileContent) {
            if (downloadButton?.current) downloadButton.current.onclick = () => {
                var a = window.document.createElement('a');
                a.href = window.URL.createObjectURL(new Blob([fileContent], { type: 'application/octet-stream' }));
                a.download = fileName || 'file.unknown';
                document.body.appendChild(a)
                a.click();
                document.body.removeChild(a)
                setFileDownloaded(true);
            }
        }
    }, [downloadButton, fileContent, fileName]);

    // Used to initialize the scanner and provides the callback to change state in the component when a chunk is successfully scanned.
    useEffect(() => {
        var canvas: CanvasRenderingContext2D | null | undefined = canvasElement?.current?.getContext("2d");

        // The if condition is used to ensure that all of the references to the elements are initialized before starting up the scan loop.
        if (webWorkers && canvasElement.current && loadingMessage.current && videoRef.current && canvas) {
            getCameraAccess(videoRef.current);
            runScanLoop(webWorkers, 0, videoRef.current, canvasElement.current, canvas, 0);
        }

        // Cleanup - this will stop the video stream if the component is unmounted
        function stopStreamedVideo(videoElem: HTMLVideoElement) {
            const stream = videoElem.srcObject;

            if (stream && (stream instanceof MediaStream)) {
                const tracks = stream.getTracks();
                tracks.forEach(function (track) {
                    track.stop();
                });
            }

            // Terminate all webworkers
            if (webWorkers) {
                console.log('Terminating web workers');
                webWorkers.forEach(x => x.terminate());
            }
        }

        const copiedVideoRef = videoRef.current
        // return the cleanup function
        return () => {
            copiedVideoRef && stopStreamedVideo(copiedVideoRef)
        }
    }, [canvasElement, loadingMessage, videoRef, webWorkers]);

    return (
        <div className="flex flex-col items-center">
            <div
                className="block rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
                <div id="loadingMessage" ref={loadingMessage}>🎥 Unable to access video stream (please make sure you have a webcam enabled)</div>

                <canvas id="canvas" ref={canvasElement} hidden>
                    <video ref={videoRef}></video>
                </canvas>

                {totalChunks && !fileContent && <div className="p-6">
                    <h5
                    className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                    Scanning underway!
                    </h5>
                    <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
                    Great, you're almost there!
                    </p>

                    <Progress value={(chunks.size / totalChunks) * 100} />

                </div>}

                {!totalChunks && <div className="p-6">
                    <h5
                    className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                    Let's start downloading
                    </h5>
                    <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
                    Scan the barcodes on the /upload page to download the file
                    </p>
                </div>
                }

                {fileContent && <div className="p-6">
                    <h5
                        className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                        Scanning complete
                    </h5>
                    <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">All QR chunks have been successfully processed!</p>
                    <Button ref={downloadButton} className="mb-10">
                        Download file
                    </Button>

                    {fileDownloaded && <div>
                        <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">Downloading another file?</p>
                            <Button onClick={() => resetState()}>
                                Reset
                            </Button>
                        </div>}
                    
                </div>}
            </div>
        </div>
    );
}

export default Download;