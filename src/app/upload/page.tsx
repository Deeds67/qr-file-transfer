'use client'

import React, { useEffect, useState } from "react";
import { convertFileToStringArray } from "../libs/compression/Conversions";
import BarcodeLooper from "../components/BarcodeLooper";
import { Button, Input, Typography } from "@material-tailwind/react";


const Upload = () => {
    const [file, setFile] = useState<File | null>(null);
    const [fileAsStringArray, setFileAsStringArray] = useState<string[] | null>();
    const [displayTime, setDisplayTime] = useState(Math.trunc(1000 / 28));
    const [maxChunkSize, setMaxChunkSize] = useState(450);
    const [sliderValue, setSliderValue] = useState<number[]>([1, 1]);


    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setFile(event.target.files[0]);
        }
    };

    // Converts file to compressed base64 array
    useEffect(() => {
        if (file) {
            convertFileToStringArray(file, maxChunkSize).then(setFileAsStringArray)
        }
    }, [maxChunkSize, file]);


    return (
            <div className="flex flex-col items-center">
                {!file && 
                    <div className="flex items-center justify-center w-full">
                        <label htmlFor="file-upload" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                                </svg>
                                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                            </div>
                            <input id="file-upload" type="file" className="hidden" onChange={handleFileChange}/>
                        </label>
                    </div>
                }
                
                {file && <Typography>Selected file: {file.name}</Typography>}

                {file && (
                    <div className="flex items-center flex-col gap-5 pt-5 pb-10">
                        <Input
                            className="mg-100"
                            type="number"
                            label="Display Rate (fps): "
                            id="qr-display-time"
                            value={Math.trunc(1000 / displayTime)}
                            maxLength={3}
                            onChange={(event) => {
                                const time = parseInt(event.target.value);
                                setDisplayTime(Math.trunc(1000 / time));
                            }}
                        />
                        <div className="w-[32rem]">
                            <Input 
                                type="number"
                                label="Max Chunk Size"
                                id="max-chunk-size" 
                                value={maxChunkSize}
                                minLength={3}
                                onChange={(event) => {
                                    const chunkSize = parseInt(event.target.value);
                                    if (chunkSize <= 1000) {
                                        console.log("setting max chunk size to " + chunkSize);
                                        setMaxChunkSize(chunkSize);
                                    }
                                }}
                            />
                            <Typography
                                variant="small"
                                color="gray"
                                className="mt-2 flex items-center gap-1 font-normal"
                            >
                                <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="-mt-px h-4 w-4"
                                >
                                <path
                                    fillRule="evenodd"
                                    d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
                                    clipRule="evenodd"
                                />
                                </svg>
                                Changing this value will change the amount of data in each barcode
                            </Typography>
                            </div>
                        
                    </div>
                )}
                
                {file && <BarcodeLooper fileDataArr={fileAsStringArray || null} displayTime={displayTime} displayRange={sliderValue}></BarcodeLooper>}

                {file && <div className="flex justify-left">
                    <Button 
                    onClick={() => {
                        setFile(null);
                        setFileAsStringArray(null);
                        setDisplayTime(Math.trunc(1000 / 28));
                    }}>
                    Reset
                    </Button>
                </div>
                }
            </div>
        );
};

export default Upload;
