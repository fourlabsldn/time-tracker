import {
  selectedDeliverable,
  isRecording,
  recordingIntervals,
  updateAt,
  recordingStartTime,
} from './utils';

export default (model, action) => {
  if (!selectedDeliverable(model) || action.shouldStart === isRecording(model)) {
    return model;
  }

  if (action.shouldStart) {
    const intervals = recordingIntervals(model);
    return updateAt(
      ['selectedProject', 'selectedDeliverable', 'recording'],
      { intervals, startTime: new Date() },
      model
    );
  }

  const stoppedInterval = {
    start: recordingStartTime(model),
    end: new Date(),
  };
  const intervals = recordingIntervals(model).concat([stoppedInterval]);
  return updateAt(
    ['selectedProject', 'selectedDeliverable', 'recording'],
    { intervals, startTime: null },
    model
  );
};