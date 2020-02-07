#!/usr/bin/env node
const fs = require('fs')
const minimist = require('minimist')
const pkg = require('../package.json')
const vitals = require('./')

const argv = minimist(process.argv.slice(2), {
  alias: {
    help: 'h',
    version: 'V'
  }
})

function version () {
  console.log(pkg.version)
}

function help () {
  console.log(`
  help tbd
  `)
}

if (argv.version) {
  version()
} else if (argv.help) {
  help()
} else {
  const inFileName = argv._[0]

  let readIn

  if (inFileName) {
    readIn = fs.readFileSync(inFileName)
  } else {
    readIn = process.stdin
    // todo: put process.stdin into a buffer
  }

  vitals.analyse(readIn)
  .then( (result) => {
    console.log(result);
  })
}
