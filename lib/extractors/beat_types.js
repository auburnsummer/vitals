/*
Does a level contain:

 - classics
 - swung beats
 - oneshots
 - squareshots
 - freetimes
 - holds (assuming holds are a thing)

*/

const _ = require('lodash');

const zeroOrUndefined = (x) => (x === 0) || _.isUndefined(x);

module.exports = (rdlevel) => {
  const classics    = _.some(rdlevel.events, evt => evt.type === "AddClassicBeat" && evt.swing === 0 && zeroOrUndefined(evt.holds));
  const swing       = _.some(rdlevel.events, evt => evt.type === "AddClassicBeat" && evt.swing !== 0 && zeroOrUndefined(evt.holds));
  const holds       = _.some(rdlevel.events, evt => evt.type === "AddClassicBeat" && evt.hold !== 0);
  const freetimes   = _.some(rdlevel.events, evt => evt.type === "AddFreeTimeBeat");
  const oneshots    = _.some(rdlevel.events, evt => evt.type === "AddOneshotBeat" && evt.pulseType === "Wave");
  const squareshots = _.some(rdlevel.events, evt => evt.type === "AddOneshotBeat" && evt.pulseType === "Square");
  return {
    hasClassics: classics,
    hasSwing: swing,
    hasHolds: holds,
    hasFreetimes: freetimes,
    hasOneshots: oneshots,
    hasSquareshots: squareshots
  }
};
