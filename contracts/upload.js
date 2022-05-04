require('dotenv').config();
const key = process.env.PINATA_KEY;
const secret = process.env.PINATA_SECRET;
const pinataSDK = require('@pinata/sdk');
const pinata = pinataSDK(key, secret);
const fs = require('fs');
const readableStreamForFile = fs.createReadStream('./image.jpg');

const options = {
    pinataMetadata: {
        name: "armoireNFT",
    },
    pinataOptions: {
        cidVersion: 0
    }
};


pinata.pinFileToIPFS(readableStreamForFile, options).then((result) => {
    const body = {
        description: "Une vieille armoire.",
        image: result.IpfsHash,
        name: "armoireNFT",
    };
    console.log(result);

    pinata.pinJSONToIPFS(body, options).then((json) => {
        console.log(json);
    }).catch((err) => {
        console.log(err);
    });

}).catch((err) => {
    console.log(err);
});
