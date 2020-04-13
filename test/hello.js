const tap = require('tap');

const vitals = require('../lib/index.js')
const fs = require('fs');
const _ = require('lodash');
const Promise = require('bluebird');

const readFile_p = Promise.promisify(fs.readFile)

const testRdzip = async (rdzipFilename, expected) => {
  const readIn = await readFile_p(rdzipFilename);
  const result = await vitals.analyse(readIn);
  return _.isMatch(result, expected);
}


tap.pass('this is fine');


tap.test('Correct header info from Know You', childTest => {
  return testRdzip("test/Andrew_Huang_-_Know_You.rdzip", {
    sha256: 'e86fbc334db27ebd59dbc472e38849c871715c787f5d11f30534a05522462340',
    artist: 'Andrew Huang',
    song: 'Know You',
    difficulty: 1,
    seizureWarning: false,
    description: 'Two lonely stars\r, wandering in the dark...',
    maxBPM: 78.5,
    minBPM: 78.5,
    tags: [ 'slow', 'pop', '1p' ],
    authors: [ 'lugi' ],
    singlePlayer: true,
    twoPlayer: false
  })
  .then( (result) => {
    console.log(result);
    childTest.ok(result);
  });
})