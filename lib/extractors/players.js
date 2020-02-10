module.exports = (rdlevel) => ({
  singlePlayer: ['OnePlayerOnly', 'BothModes'].includes(rdlevel.settings.canBePlayedOn),
  twoPlayer: ['TwoPlayerOnly', 'BothModes'].includes(rdlevel.settings.canBePlayedOn),
});
