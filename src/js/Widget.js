// @flow
import React from 'react';
import moment from 'moment';
import { reduce, prop, pipe, add, map, curry, concat } from 'ramda';
import Select from 'react-select';

// diff in ms
const calcInterval = curry((end, start) => moment(end).diff(moment(start)));

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

const toOption = ({ name }) => ({ name, label: name });

const toProjectsArray = (maybeProjects, maybeSelectedProject) =>
  pipe(
    Maybe.map(Array),
    Maybe.withDefault([]),
    concat(Maybe.withDefault([], maybeProjects))
  )(maybeSelectedProject);

const toDeliverablesArray = pipe(
    Maybe.map(prop('project')),
    Maybe.map(({ selectedDeliverable, deliverables }) => [selectedDeliverable, ...deliverables]),
    Maybe.withDefault([]),
    map(toOption)
  );

const toSelectedDeliverable = pipe(
  Maybe.map(prop('project')),
  Maybe.map(prop('selectedDeliverable')),
  Maybe.map(toOption),
  Maybe.withDefault(null)
);

class Widget extends React.Component {
  constructor() {
    super();
    this.state =
  }
  const maybeSelectedProject = Maybe.map(prop('project'), maybeRecording);
  const availableProjects = toProjectsArray(maybeProjects, maybeSelectedProject);
  const timerRunning = pipe(
    Maybe.map(prop('startTime')),
    Maybe.withDefault(Maybe.Nothing()),
    Maybe.map(_ => true),
    Maybe.withDefault(false)
  )(maybeRecording);

  return (
    <div className="TimeTracker">
      <div className="TimeTracker-timer">
        <div className="TimeTracker-timer-recording">
        </div>

        <div className="TimeTracker-timer-time">
          {recordingTime(maybeRecording)}
        </div>
      </div>

      <div className="TimeTracker-projects">
        <Select
          name="form-field-name"
          value={Maybe.map(toOption, maybeSelectedProject).withDefault(null)}
          options={map(toOption, availableProjects)}
          onChange={dispatchSelectProject}
        />
      </div>

      <div className="TimeTracker-deliverables">
        <Select
          name="form-field-name"
          value={toSelectedDeliverable(maybeRecording)}
          options={toDeliverablesArray(maybeRecording)}
          onChange={dispatchSelectDeliverable}
        />
      </div>

      <button
        className="TimeTracker-stop"
        onClick={_ => dispatchStartStopTimer(new Date(), !timerRunning)}
      >
        {timerRunning ? 'Stop': 'Start'}
      </button>
    </div>
  );
};
// {projectsBox(maybeProjects, Maybe.map(prop('project'), maybeRecording))}



const mapStateToProps = state => ({
  maybeRecording: state.recording,
  maybeProjects: (function () {
    return RemoteData.toMaybe(state.availableProjects);
  }()),
});

const mapDispatchToProps = dispatch => ({
  dispatchSelectProject: pipe(selectProject, dispatch),
  dispatchSelectDeliverable: pipe(selectDeliverable, dispatch),
  dispatchStartStopTimer: (...args) => dispatch(startStopTimer(...args)),
});

Widget.propTypes = {
  maybeRecording: React.PropTypes.object,
  maybeProjects: React.PropTypes.object,
  dispatchSelectProject: React.PropTypes.func,
  dispatchSelectDeliverable: React.PropTypes.func,
  dispatchStartStopTimer: React.PropTypes.func,
};

export default connectWithStore(
  mapStateToProps,
  mapDispatchToProps
)(Widget, store);
