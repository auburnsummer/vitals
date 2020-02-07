const jszip = require('jszip')
const _ = require('lodash')
const RDLevel = require('rdlevel')

/**
 * Analyse an rdzip file.
 *
 * @param buffer: A Buffer object which is the loaded rdzip file
 * @param extractors: A list of extractors to run
 */
module.exports = async (buffer, extractors) => {
  // unzip it.
  let zip
  let lastUpdated
  let rdlevel
  try {
    // load the contents of the .rdlevel.
    zip = await jszip.loadAsync(buffer)
    const rdlevelFile = zip.file('main.rdlevel')
    lastUpdated = rdlevelFile.date
    rdlevel = await rdlevelFile.async('string')
  } catch (err) {
    console.log(err)
    return Promise.reject('Zip error. Is this an rdzip? | ' + err)
  }
  return RDLevel.parse(rdlevel)
}
