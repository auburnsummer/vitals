const upload = require('../ipfs/upload.js');

module.exports = async (rdlevel, zip) => {
  const imageName = rdlevel.settings.previewImage;
  const imageBuffer = await zip.file(imageName).async('nodebuffer');

  let ipfsHash;
  try {
    ipfsHash = await upload(imageBuffer);
  } catch (err) {
    console.log(err);
    // rethrow the error
    throw err;
  }
  return {
    image_ipfs: ipfsHash,
  };
};
