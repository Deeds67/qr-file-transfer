'use client'

import React, { useEffect, useState } from "react";
import { convertFileToStringArray } from "../libs/compression/Conversions";
import { DebounceInput } from "react-debounce-input";
import BarcodeLooper from "../components/BarcodeLooper";
import { Input } from "@material-tailwind/react";


const Upload = () => {
    const [file, setFile] = useState<File | null>(null);
    const [fileAsStringArray, setFileAsStringArray] = useState<string[] | null>();
    const [displayTime, setDisplayTime] = useState(1000);//Math.trunc(1000 / 28));
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
    }, [file]);


    return (
        <div>
            <label htmlFor="file-upload">Choose a file to upload:</label>
            <input
                id="file-upload"
                type="file"
                onChange={handleFileChange}
            />
            {file && <p>Selected file: {file.name}</p>}
            <DebounceInput element="input" type="number" label="Max Chunk Size" id="max-chunk-size" value={maxChunkSize}
                    minLength={3}
                    debounceTimeout={500}
                    onChange={event => {
                        const chunkSize = parseInt(event.target.value);
                        if (chunkSize <= 1000) {
                            setMaxChunkSize(chunkSize);
                        }
                    }} />
                <br />
                <DebounceInput element="input"  type="number" label="Display Rate (fps): " id="qr-display-time" value={Math.trunc(1000 / displayTime)}
                    maxLength={3}
                    debounceTimeout={500}
                    onChange={event => {
                        const time = parseInt(event.target.value);
                        setDisplayTime(Math.trunc(1000 / time));
                    }
                    } />

            <BarcodeLooper fileDataArr={fileAsStringArray || null} displayTime={displayTime} displayRange={sliderValue}></BarcodeLooper>

        </div>
    );
};

export default Upload;
