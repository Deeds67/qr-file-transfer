import { compressArrayBufferToBase64String } from './Compression';

export async function convertFileToStringArray(file, maxChunkSize) {
	const compressedBase64 = await convertFileToCompressedBase64String(file)
	return convertBase64StringToStringArray(compressedBase64, file?.name, file?.type, maxChunkSize)
}

async function readFileAsArrayBuffer(file) {
    return file.arrayBuffer();
}

async function convertFileToCompressedBase64String(file) {
    return readFileAsArrayBuffer(file).then(arrayBuffer => {
        const base64 = compressArrayBufferToBase64String(arrayBuffer);
        return base64;
    });
}

async function convertBase64StringToStringArray(fileDataStr, fileName, fileType, maxChunkSize) {
    const nrOfChunks = Math.ceil(fileDataStr.length / maxChunkSize);
	const zeroIndexTotalChunks = nrOfChunks - 1;
	const fileData = [];
	for (let chunkIndex = 0; chunkIndex < nrOfChunks; chunkIndex++) {
		const currentStart = chunkIndex * maxChunkSize;
		const currentEnd = Math.min(currentStart + maxChunkSize, fileDataStr.length);
		const sanitizedFileName = fileName.replaceAll('|', '') || `file.${fileType || 'unknown'}`;
		const prefix = (chunkIndex === 0) ? `${sanitizedFileName}|${chunkIndex}/${zeroIndexTotalChunks}` : `${chunkIndex}/${zeroIndexTotalChunks}`;
		console.log('prefix: ' + prefix);
		const chunkData = [prefix, fileDataStr.slice(currentStart, currentEnd)].join('|');
		fileData.push(chunkData);
	}
	console.log(fileData);
	return fileData;
}
