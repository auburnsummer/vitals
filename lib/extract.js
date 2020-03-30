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

buffer is the raw binary representation of the .rdzip file. this is only used for
the extractor that finds the sha256 hash, and I don't anticipate it being used for
anything else.

*/

/**
 * Generate an extractor function which gets out a key and puts it under the name
 * or gives it a default value if the key does not exist
 */
const simpleKeyExtractor = (name, key, def) => (rdlevel) => ({
  [name]: _.get(rdlevel, key) || def,
});

/**
 * List of extractor functions we support.
 *
 * For simpler ones, feel free to either use simpleKeyExtractor or
 * inline an anonymous function. Otherwise, you should make it a seperate file.
 */

/* eslint-disable */
const extractors = {
  artist:         simpleKeyExtractor('artist', 'settings.artist'),
  song:           simpleKeyExtractor('song', 'settings.song'),
  difficulty:     require('./extractors/difficulty.js'),
  seizureWarning: simpleKeyExtractor('seizureWarning', 'settings.seizureWarning', false),
  description:    simpleKeyExtractor('description', 'settings.description'),
  minAndMaxBPMs:  require('./extractors/minAndMaxBPMs.js'),
  tags:           require('./extractors/tags.js'),
  lastUpdated:    require('./extractors/lastUpdated.js'),
  author:         require('./extractors/authors.js'),
  players:        require('./extractors/players.js'),
  previewImage:   require('./extractors/previewImage.js'),
  icon:           require('./extractors/icon.js')
};
/* eslint-enable */

/*
List of non-deterministic extractors. These are excluded from testing.
Generally, only ones that interact with a web service (e.g. imgur) are non-deterministic.
*/
const notDeterministic = [
  'previewImage',
  'icon',
];

module.exports = (rdlevel, zip, buffer, selectedExtractors, test) => {
  // default: get all of the extractors
  let extractorsToRun = selectedExtractors || _.keys(extractors);
  if (test) {
    extractorsToRun = _.difference(extractorsToRun, notDeterministic);
  }

  // run each extractor, building up an object as we go
  return _.reduce(extractorsToRun, async (prev, curr) => {
    const extractor = extractors[curr];
    const partial = await extractor(rdlevel, zip, buffer);
    const rprev = await prev;
    return _.assign(rprev, partial);
  }, {});
};
