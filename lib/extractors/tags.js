const _ = require('lodash');

module.exports = (rdlevel) => {
  const tags = _.map(_.split(rdlevel.settings.tags, ','), _.trim);
  return {
    tags,
  };
};
