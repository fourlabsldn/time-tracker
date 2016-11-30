// @flow
import { connect } from 'react-redux';
import React from 'react';
import moment from 'moment';
import { reduce, prop, pipe, add } from 'ramda';
import { Maybe, RemoteData } from './types';
import store from './redux/store';
import connectWithStore from './redux/connectWithStore';

// diff in ms
function calcInterval(end, start) {
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
    (total, { start, end }) => total + calcInterval(end, start),
    0,
    intervals
  );

  const totalTime = pipe(calcInterval(new Date()), add(intervalsSum));

  return pipe(
    Maybe.map(totalTime),
    Maybe.withDefault(intervalsSum)
  )(startTime);
}

const pad2 = num => (`00${num}`).slice(-2);

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

const projectsBox = (maybeProjects, _) => (
  <ul>
    {pipe(
        Maybe.map(projects => projects.map(p => <li> {p.name} </li>)),
        Maybe.withDefault(<li></li>)
      )(maybeProjects)
    }
  </ul>
);

const deliverablesBox = (selectedDeliverable, otherDeliverables) => (
  <ul>
    {[selectedDeliverable, ...otherDeliverables].map(d => <li> {d.name} </li>)}
  </ul>
);

const Widget = ({ maybeRecording, maybeProjects }) => (
  <div className="TimeTracker">
    <div className="TimeTracker-timer">
      <div className="TimeTracker-timer-recording">
      </div>

      <div className="TimeTracker-timer-time">
        {recordingTime(maybeRecording)}
      </div>
    </div>

    <div className="TimeTracker-projects">
      {projectsBox(maybeProjects, Maybe.map(prop('project'), maybeRecording))}
    </div>

    <div className="TimeTracker-deliverables">
    {pipe(
        prop('project'),
        p => deliverablesBox(p.selectedDeliverable, p.deliverables)
      )(maybeRecording)
    }
    </div>

    <button className="TimeTracker-stop">
      Stop
    </button>
  </div>
);


const mapStateToProps = state => ({
  maybeRecording: state.recording,
  maybeProjects: RemoteData.toMaybe(state.availableProjects),
});

const mapDispatchToProps = _ => ({});

Widget.propTypes = {
  maybeRecording: React.PropTypes.object,
  maybeProjects: React.PropTypes.object,
};

export default connectWithStore(
  mapStateToProps,
  mapDispatchToProps
)(Widget, store);
