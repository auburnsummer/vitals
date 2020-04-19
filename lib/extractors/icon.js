const _ = require('lodash');
const upload = require('../ipfs/upload.js');

module.exports = async (rdlevel, zip) => {
  const imageName = rdlevel.settings.syringeIcon;
  if (_.isEmpty(imageName)) {
    // no syringe icon
    return {
      iconIpfsHash: null,
    };
  }
  const imageBuffer = await zip.file(imageName).async('nodebuffer');

  let imageHash;
  try {
    imageHash = await upload(imageBuffer);
  } catch (err) {
    console.log(err);
    // the image might be malformed if we couldn't upload it
    imageHash = null;
  }
  return {
    iconIpfsHash: imageHash,
  };
};
