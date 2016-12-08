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
export default curry((model) => {
  if (!isRecording(model)) {
    return setStartTime(model, new Date());
  }

  const newInterval = TimeInterval.of(getStartTime(model), new Date());

  return pipe(
    setStartTime(null),
    setIntervals([newInterval, ...getIntervals(model)])
  )(model);
});
