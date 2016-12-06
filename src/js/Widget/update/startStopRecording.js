import { pipe, propOr, prop, concat } from 'ramda';
import {
  selectedDeliverable,
  allGroups,
  updateAt,
  selectedRecording,
} from './utils';

export default (model, action) => {
  const alreadyRecordingSelectedOne = allGroups(model)
    .map(prop('deliverable'))
    .filter(prop('startTime'))
    .includes(selectedDeliverable(model));

  if (!selectedDeliverable(model) || action.shouldStart === alreadyRecordingSelectedOne) {
    return model;
  }

  const recording = selectedRecording(model);
  if (action.shouldStart) {
    // We create the whole TimeInterval because recording may be null.
    const intervals = propOr([], 'intervals', recording);
    return updateAt(
      ['selectedProject', 'selectedDeliverable', 'recording'],
      { intervals, startTime: new Date() },
      model
    );
  }

  const stoppedInterval = {
    start: recording.startTime,
    end: new Date(),
  };

  const intervals = pipe(
    propOr([], 'intervals'),
    concat([stoppedInterval])
  )(recording);


  const m =  updateAt(
    ['selectedProject', 'selectedDeliverable', 'recording'],
    { intervals, startTime: null },
    model
  );
  console.log('stopped', m)
  return m;
};
