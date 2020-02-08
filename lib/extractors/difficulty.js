const _ = require('lodash')

const DIFFICULTIES = ['Easy', 'Medium', 'Tough', 'VeryTough']
const defaultDifficulty = 1 // Medium

module.exports = (rdlevel) => {
  return {
    difficulty: _.indexOf(DIFFICULTIES, rdlevel.settings.difficulty) || defaultDifficulty
  }
}
