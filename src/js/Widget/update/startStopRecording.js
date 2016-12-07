import {
  selectedDeliverable,
  updateAt,
} from './utils';

import { Recording, Deliverable, TimeInterval } from '../../types';
import { pipe } from 'ramda';

export default (model, action) => {
  const recording = pipe(
    selectedDeliverable,
    Deliverable.getRecording,
  )(model);

  if (!selectedDeliverable(model) || action.shouldStart === Recording.isRecording(recording)) {
    return model;
  }

  const intervals = Recording.getIntervals(recording);
  if (action.shouldStart) {
    return updateAt(
      ['selectedProject', 'selectedDeliverable', 'recording'],
      { intervals, startTime: new Date() },
      model
    );
  }

  const stoppedInterval = TimeInterval.of({
    start: Recording.getStartTime(recording),
    end: new Date(),
  });

  const newRecording = Recording.of(Object.assign({}, recording, {
    startTime: null,
    intervals: intervals.concat([stoppedInterval]),
  }));

  return updateAt(
    ['selectedProject', 'selectedDeliverable', 'recording'],
    newRecording,
    model
  );
};
