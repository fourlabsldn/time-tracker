// @flow
import { connect } from 'react-redux'
import React from 'react';
import moment from 'moment';
import { reduce, prop } from 'ramda';
import { Maybe } from './types';

// diff in ms
function calcInterval(start, end) {
  moment(end).diff(moment(start));
}

/**
 * @method calculateRunningTime
 * @param  {Object.Maybe<Date>} startTime
 * @param  {Object.Array<Object>} intervals - Time intervals of type { start: Object, end: Object}
 * @return {Integer}
 */
function calculateRunningTime({ startTime, intervals }) {
  const intervalsSum = reduce(
    (total, { start, end }) => total + calcInterval(start, end),
    0,
    intervals
  );

  return Maybe.map(add(intervalsSum)).withDefault(intervalsSum);
}

const pad2 = num => ("00" + num).slice(-2);

function millisecondsToTimeString(ms) {
  const seconds = ms % 1000;
  const minutes = ms % (1000 * 60);
  const hours = ms % (1000 * 60 * 60);
  return `${pad2(hours)}:${pad2(minutes)}:${pad2(seconds)}`;
}


const recordingTime = pipe(
  Maybe.map(pipe(calculateRunningTime, millisecondsToTimeString)),
  Maybe.withDefault('00:00:00')
);

const projectsBox = (maybeProjects, maybeSelectedProject) => (
  <ul>
    { pipe(
        Maybe.map(projects => projects.map(p => <li> p.name </li>)),
        Maybe.withDefault(<li></li>)
      )(maybeProjects)
    }
  </ul>
)

const Widget = ({ maybeRecording, maybeProjects }) => (
  <div class="TimeTracker">
    <div class="TimeTracker-timer">
      <div class="TimeTracker-timer-recording">
      </div>

      <div class="TimeTracker-timer-time">
        {recordingTime(maybeRecording)}
      </div>
    </div>

    <div class="TimeTracker-projects">
      {projectsBox(maybeProjects, Maybe.map(prop('project'), maybeRecording))}
    </div>

    <div class="TimeTracker-deliverables">
    </div>

    <button class="TimeTracker-stop">
      Stop
    </button>
  </div>
);



export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList)
