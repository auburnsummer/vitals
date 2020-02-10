const imgur = require('imgur');
const _ = require('lodash');

module.exports = async (rdlevel, zip) => {
  const imageName = rdlevel.settings.syringeIcon;
  if (_.isEmpty(imageName)) {
    // no syringe icon
    return {
      icon: false,
    };
  }
  const imageBase64 = await zip.file(imageName).async('base64');

  let imageURL;
  try {
    const json = await imgur.uploadBase64(imageBase64);
    imageURL = json.data.link;
  } catch (err) {
    console.log(err);
    // the image might be malformed if we couldn't upload it
    imageURL = false;
  }
  return {
    icon: imageURL,
  };
};
