import React from 'react';
import { pipe } from 'ramda';
import { Recording } from '../../types';

const pad2 = num => (`00${num}`).slice(-2);

function millisecondsToTimeString(ms) {
  const seconds = Math.floor(ms / 1000) % 60;
  const minutes = Math.floor(ms / (1000 * 60)) % 60;
  const hours = Math.floor(ms / (1000 * 60 * 60)) % 24;

  return hours > 0
    ? `${pad2(hours)}:${pad2(minutes)}`
    : `${pad2(minutes)}:${pad2(seconds)}`;
}

// We use a class instead of a stateless component because we
// need the `this` keyword to trigger the force-update
export default class Timer extends React.Component {
  render() {
    const { recording } = this.props;
    if (Recording.isRecording(recording)) {
      setTimeout(_ => this.forceUpdate(), 500);
    }

    const timeString = pipe(Recording.totalTime, millisecondsToTimeString)(recording);

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
  recording: React.PropTypes.object,
};
