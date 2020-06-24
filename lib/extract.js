/**
 * Mapping of strings to functions that extract things out
 */

const _ = require('lodash');

/*
By the way, what's an extractor function? It's basically any function that meets
the signature (rdlevel, zip, buffer) => (a json object).

rdlevel is a json object parsed using the RDLevel library. Probably most extractors will
only use this one.

zip is a jszip object of the .rdzip file. You can use this if your extractor needs
to reach outside of the rdlevel (e.g. looking at images or doing analysis of the song)

buffer is the raw binary representation of the .rdzip file. this is used for the
ipfs uploader and the sha256 hash extractors currently.
*/

/**
 * Generate an extractor function which gets out a key and puts it under the name
 * or gives it a default value if the key does not exist
 */
const simpleKeyExtractor = (name, key, def) => (rdlevel) => ({
  [name]: _.get(rdlevel, key, def)
});

/**
 * List of extractor functions we support.
 *
 * For simpler ones, feel free to either use simpleKeyExtractor or
 * inline an anonymous function. Otherwise, you should make it a seperate file.
 */

/* eslint-disable */
const extractors = {
  sha256:                   require('./extractors/sha256.js'),
  ipfs_hash:                require('./extractors/upload_to_ipfs.js'),
  artist:                   simpleKeyExtractor('artist', 'settings.artist'),
  song:                     simpleKeyExtractor('song', 'settings.song'),
  difficulty:               require('./extractors/difficulty.js'),
  seizure_warning:          simpleKeyExtractor('seizure_warning', 'settings.seizureWarning', false),
  description:              simpleKeyExtractor('description', 'settings.description', ""),
  preview_image_ipfs_hash:  require('./extractors/preview_image.js'),
  icon_ipfs_hash:           require('./extractors/icon.js'),
  min_and_max_bpms:         require('./extractors/min_and_max_bpms.js'),
  tags:                     require('./extractors/tags.js'),
  last_updated:             require('./extractors/last_updated.js'),
  author:                   require('./extractors/authors.js'),
  players:                  require('./extractors/players.js'),
  song_name_hue:            simpleKeyExtractor('hue', 'settings.songNameHue')
};
/* eslint-enable */

/**
 * list of profiles - sets of extractors to run.
 */
const profiles = {
  all: () => _.keys(extractors),
  test: () => _.difference(_.keys(extractors), ['preview_image_ipfs_hash', 'icon_ipfs_hash', 'ipfs_hash']),
  noupload: () => _.difference(_.keys(extractors), ['ipfs_hash']),
};


module.exports = (rdlevel, zip, buffer, profile) => {
  const extractorsToRun = profiles[profile]();

  // run each extractor, building up an object as we go
  return _.reduce(extractorsToRun, async (prev, curr) => {
    const extractor = extractors[curr];
    const partial = await extractor(rdlevel, zip, buffer);
    const rprev = await prev;
    return _.assign(rprev, partial);
  }, {});
};
