const { Storage } = require('@google-cloud/storage');
const fs = require('fs');

// Initialize storage client
const storage = new Storage();
const bucketName = process.env.BUCKET_NAME;

// Function to upload a file
async function uploadFile(fileName) {
    try {
        await storage.bucket(bucketName).upload(fileName, {
            gzip: true,
            metadata: {
                cacheControl: 'public, max-age=31536000',
            },
        });
        console.log(`${fileName} uploaded to ${bucketName}.`);
    } catch (error) {
        console.error('Error uploading file:', error);
    }
}

// Function to download a file
async function downloadFile(fileName, destination) {
    try {
        await storage.bucket(bucketName).file(fileName).download({
            destination: destination,
        });
        console.log(`gs://${bucketName}/${fileName} downloaded to ${destination}.`);
    } catch (error) {
        console.error('Error downloading file:', error);
    }
}

// Example usage
(async () => {
    // Upload a file
    await uploadFile('/home/some-home-dir/Templates/file');

    // Download a file
    await downloadFile('file', '~/Downloads');
})();