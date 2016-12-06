import { pipe, propOr, prop, concat } from 'ramda';
import {
  selectedDeliverable,
  allRecordings,
  updateAt,
  selectedRecording,
} from './utils';

export default (model, action) => {
  const alreadyRecordingSelectedOne = allRecordings(model)
    .map(prop('deliverable'))
    .includes(selectedDeliverable(model));

  if (!selectedDeliverable(model) || action.shouldStart === alreadyRecordingSelectedOne) {
    return model;
  }

  const recording = selectedRecording(model);
  if (action.shouldStart) {
    // We create the whole TimeInterval because recording may be null.
    const intervals = propOr([], 'recording');
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


  return updateAt(
    ['selectedProject', 'selectedDeliverable', 'recording'],
    { intervals, startTime: null },
    model
  );
};
