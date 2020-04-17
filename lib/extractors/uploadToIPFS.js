const upload = require('../ipfs/upload.js');

module.exports = async (rdlevel, zip, buffer) => {
    let ipfsHash;
    ipfsHash = await upload(buffer);
    return {
        rdzipIpfsHash: ipfsHash
    }
}