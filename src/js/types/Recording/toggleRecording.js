import { curry, pipe } from 'ramda';
import TimeInterval from '../TimeInterval';
import {
  isRecording,
  getStartTime,
  getIntervals,
  setStartTime,
  setIntervals,
} from './index';

/**
 * Toggles a recording to on or off
 * @params {Project} model
 * @params {Date} time
 * @params {Boolean} on
 */
export default curry((time, on, model) => {
  const recordingStarted = isRecording(model);

  if ((!on && !recordingStarted) || (on && recordingStarted)) {
    return model;
  }

  if (on) {
    return setStartTime(model, time);
  }

  const newInterval = TimeInterval.of(getStartTime(model), time);

  return pipe(
    setStartTime(time),
    setIntervals([newInterval, ...getIntervals(model)])
  )(model);
});
