const upload = require('../ipfs/upload.js');

module.exports = async (rdlevel, zip, buffer) => {
  const ipfsHash = await upload(buffer);
  return {
    rdzip_ipfs: ipfsHash,
  };
};
