const ImageKit = require("imagekit");

const imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
});

async function uploadFile(buffer, fileName) {
    const result = await imagekit.upload({
        file: buffer,       // required
        fileName: fileName, // required
    });

    return result.url; // return full result object, not just URL
}

module.exports = {
    uploadFile
};
