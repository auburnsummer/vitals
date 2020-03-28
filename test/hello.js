const tap = require('tap');
const fs = require('fs');
const vitals = require('../lib/index.js')

tap.pass('this is fine');

/*
 * Tests an rdzip, given a filename and the expected JSON output.
 */
const testRdzip = (rdzipFilename, expected) => {
  readIn = fs.readFileSync(rdzipFilename);
}