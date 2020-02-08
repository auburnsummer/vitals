module.exports = (rdlevel) => {
  return {
    singlePlayer: ['OnePlayerOnly', 'BothModes'].includes(rdlevel.settings.canBePlayedOn),
    twoPlayer: ['TwoPlayerOnly', 'BothModes'].includes(rdlevel.settings.canBePlayedOn)
  }
}
