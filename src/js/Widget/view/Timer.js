import React from 'react';
import moment from 'moment';
import { curry, reduce, add, pipe } from 'ramda';


// diff in ms
const calcInterval = curry((end, start) => moment(end).diff(moment(start)));

/**
 * @method calculateRunningTime
 * @param  {Date} startTime
 * @param  {Array<Object>} intervals - Time intervals of type { start: Object, end: Object}
 * @return {Integer}
 */
function calculateRunningTime(startTime, intervals) {
  const intervalsSum = reduce(
    (total, { start, end }) => total + calcInterval(end, start),
    0,
    intervals
  );

  const totalTime = pipe(calcInterval(new Date()), add(intervalsSum));

  return startTime
    ? totalTime(startTime)
    : intervalsSum;
}

const pad2 = num => (`00${num}`).slice(-2);

function millisecondsToTimeString(ms) {
  const seconds = Math.floor(ms / 1000) % 60;
  const minutes = Math.floor(ms / (1000 * 60)) % 60;
  const hours = Math.floor(ms / (1000 * 60 * 60)) % 24;

  return hours > 0
    ? `${pad2(hours)}:${pad2(minutes)}`
    : `${pad2(minutes)}:${pad2(seconds)}`;
}


const recordingTime = (startTime, intervals) => {
  const runningTime = calculateRunningTime(
    startTime || 0,
    intervals || []
  );

  return millisecondsToTimeString(runningTime);
};


export default class Timer extends React.Component {
  render() {
    const { startTime, intervals } = this.props;

    if (startTime) {
      setTimeout(_ => this.forceUpdate(), 10);
    }

    const timeString = recordingTime(startTime, intervals);

    return (
      <div
        className="TimeTracker-timer-time"
        style={{ minWidth: `${timeString.length * 0.6}em` }}
      >
        {timeString}
      </div>
    );
  }
}

Timer.propTypes = {
  startTime: React.PropTypes.object,
  intervals: React.PropTypes.array,
};