const { Storage } = require('@google-cloud/storage');
const fs = require('fs');

// Initialize storage client
const storage = new Storage();
const bucketName = process.env.BUCKET_NAME;

// Function to upload a file
async function uploadThisFile(fileName) {
    try {
        await storage.bucket(bucketName).upload(fileName, {
            gzip: true,
            metadata: {
                cacheControl: 'public, max-age=3100000',
            },
        });
        console.log(`[UPLOAD] ${fileName} uploaded to ${bucketName}.`);
    } catch (error) {
        console.error('[UPLOAD] Error :', error);
    }
}

// Function to download a file
async function downloadThisFile(fileName, destination) {
    try {
        await storage.bucket(bucketName).file(fileName).download({
            destination: destination,
        });
        console.log(`[DOWNLOAD] gs://${bucketName}/${fileName} downloaded to ${destination}.`);
    } catch (error) {
        console.error('[DOWNLOAD] Error :', error);
    }
}

// Example usage
(async () => {
    // Upload a file
    await uploadThisFile('~/Templates/file');

    // Download a file
    await downloadThisFile('file', '~/Downloads/downloaded');
})();