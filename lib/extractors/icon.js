const _ = require('lodash');
const upload = require('../ipfs/upload.js');

module.exports = async (rdlevel, zip) => {
  const imageName = rdlevel.settings.syringeIcon;
  if (_.isEmpty(imageName)) {
    // no syringe icon
    return {
      icon_ipfs: null,
    };
  }
  const imageBuffer = await zip.file(imageName).async('nodebuffer');

  let imageHash;
  try {
    imageHash = await upload(imageBuffer);
  } catch (err) {
    console.log(err);
    // it's fine, we can just call it null
    imageHash = null;
  }
  return {
    icon_ipfs: imageHash,
  };
};
