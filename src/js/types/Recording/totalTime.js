import { add, pipe } from 'ramda';
import { getIntervals, getStartTime } from './index';
import TimeInterval from '../TimeInterval';

/**
 * @method calculateRunningTime
 * @param  {Date} startTime
 * @param  {Array<TimeInterval>} intervals - Time intervals of type { start: Object, end: Object}
 * @return {Integer}
 */
function calculateRunningTime(startTime, intervals) {
  const intervalsSum = intervals
    .map(TimeInterval.getValue)
    .reduce(add, 0);

  const sumSinceStartTime = !startTime
    ? 0
    : pipe(
        d => ({ start: d, end: new Date() }),
        TimeInterval.of,
        TimeInterval.getValue
      )(startTime);

  return intervalsSum + sumSinceStartTime;
}

/**
 *
 * @param  {Recording} recording
 * @return {Integer} - Time in milliseconds
 */
export default (model) => {
  const startTime = getStartTime(model);
  const intervals = getIntervals(model);

  return calculateRunningTime(startTime, intervals);
};
