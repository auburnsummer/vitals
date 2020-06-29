/*
Time in which you are playing, in seconds
*/

module.exports = (rdlevel) => {

  // approach - normalise setcrotchetsperbar so that "beat" is our only unit

  const crotchetEvents = 

  // then - bpm on bar...

  // all the relevant events.
  const firstGameplayEvent = _.find(rdlevel.events, (evt) => {
    return evt.type === "AddClassicBeat" ||
    evt.type === "AddFreeTimeBeat" ||
    evt.type === "AddOneshotBeat"
  });

  const finishEvent = _.find(rdlevel.events, (evt) => {
    return evt.type === "FinishLevel"
  });
  
  const relevantEventsRaw = _.filter(rdlevel.events, (evt) => {
    return evt.type === "SetCrotchetsPerBar" ||
    evt.type === "PlaySong" ||
    evt.type === "SetBeatsPerMinute"
  });

  const events = _.concat(firstGameplayEvent, relevantEventsRaw, finishEvent)

}