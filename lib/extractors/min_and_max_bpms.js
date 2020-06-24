const _ = require('lodash');

module.exports = (rdlevel) => {
  // first, filter for just the BPM events.
  const bpmEvents = _.filter(rdlevel.events, (e) => _.includes(['PlaySong', 'SetBeatsPerMinute'], e.type));
  // then, the bpm is either in the .bpm or .beatsPerMinute key
  const bpms = _.map(bpmEvents, (e) => e.bpm || e.beatsPerMinute);

  return {
    max_bpm: _.max(bpms) || 0,
    min_bpm: _.min(bpms) || 0,
  };
};
