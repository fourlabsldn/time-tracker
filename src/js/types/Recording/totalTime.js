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
    ? pipe(TimeInterval.of, TimeInterval.getValue)(new Date(), startTime)
    : 0;

  return intervalsSum + sumSinceStartTime;
}

/**
 *
 * @param  {Project} model
 * @return {Integer} - Time in milliseconds
 */
export default (model) => {
  const startTime = getStartTime(model);
  const intervals = getIntervals(model);

  return startTime
    ? calculateRunningTime(startTime, intervals)
    : startTime;
};
