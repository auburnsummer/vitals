/*
Get things like
donte, ladybug
donte & ladybug
donte and ladybug
donte, noche, and ladybug
donte, noche, & ladybug
*/
const AUTHOR_REGEX = /\s*?(?:,|&|\/|\\|,? ,?and )\s*?/;
const _ = require('lodash');

module.exports = (rdlevel) => ({
  authors: _.map(_.split(rdlevel.settings.author, AUTHOR_REGEX), _.trim),
});
