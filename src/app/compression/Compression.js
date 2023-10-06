import Zlib from 'zlibjs/bin/zlib_and_gzip.min.js'
import { bytesToBase64, base64ToBytes } from './Conversions';

// Doos lank gevat om hierdie piece of shit uit te figure https://github.com/Explodey54/minecraft-artifier-js/blob/df81723c4f7a488a49ba09f94d458eac3a74680f/app/models/schematics.js
const zl = Zlib.Zlib

export function compressArrayBufferToBase64String(arrayBuffer) {
    const uint8View = new Uint8Array(arrayBuffer);
    const deflate = new zl.Deflate(uint8View);
    const compressed  = deflate.compress();
    return bytesToBase64(compressed);
}

export function decompressBase64StringToArrayBuffer(base64) {
    const bytes = base64ToBytes(base64);
    var inflate = new zl.Inflate(bytes);
    return inflate.decompress();
}