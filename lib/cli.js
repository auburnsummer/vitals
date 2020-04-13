#!/usr/bin/env node
const fs = require('fs');
const minimist = require('minimist');
const pkg = require('../package.json');
const vitals = require('./');

/*
For now, vitals just takes a single argument - the name of the file.

I would like to look at ways of specifying which extractors are used in the CLI,
but I can't think of a decent way of doing it that doesn't require a million flags.
*/
const argv = minimist(process.argv.slice(2), {
  alias: {
    version: 'V',
  },
});

function version() {
  console.log(pkg.version);
}

if (argv.version) {
  version();
} else {
  const inFileName = argv._[0];

  let readIn;

  if (inFileName) {
    readIn = fs.readFileSync(inFileName);
  } else {
    console.error('A file is required!');
    process.exit(1);
  }

  vitals.analyse(readIn)
    .then((result) => {
      console.log(result);
    });
}
