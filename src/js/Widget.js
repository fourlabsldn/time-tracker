/* eslint-disable no-nested-ternary */
import React from 'react';
import moment from 'moment';
import Select from 'react-select';
import { State } from './types';
import {
  startStopRecording,
  selectDeliverable,
  selectProject,
  setProjects,
} from './Widget.update';
import { reduce, pipe, add, curry, prop } from 'ramda';


// diff in ms
const calcInterval = curry((end, start) => moment(end).diff(moment(start)));

/**
 * @method calculateRunningTime
 * @param  {Maybe<Date>} startTime
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
  const seconds = ms % 1000;
  const minutes = ms % (1000 * 60);
  const hours = ms % (1000 * 60 * 60);
  return `${pad2(hours)}:${pad2(minutes)}:${pad2(seconds)}`;
}


const recordingTime = state => {
  if (!state.recording || !state.recording.startTime) {
    return '00:00:00';
  }

  const runningTime = calculateRunningTime(
    state.recording.startTime,
    state.recording.intervals
  );

  return millisecondsToTimeString(runningTime);
};

const selectedProject = ({ recording }) => (
  recording
    ? recording.project.name
    : null
);

const availableProjects = (state) => (
  state.recording
    ? (state.availableProjects || [])
      .concat([state.recording.project])
    : (state.availableProjects || [])
);

const selectedDeliverable = ({ recording }) => (
  recording && recording.project.selectedDeliverable
    ? recording.project.selectedDeliverable.name
    : null
);

const availableDeliverables = ({ recording }) => {
  if (!recording) {
    return [];
  }
  const selected = recording.project.selectedDeliverable;

  if (!selected) {
    return recording.project.deliverables;
  }

  return recording.project.deliverables
    .concat([selected]);
};

/**
 * @param {Object} state
 * @return bool
 */
const isRecording = state => {
  return state.recording && state.recording.startTime;
};

const toOption = el => (
  el
  ? pipe(prop('name'), name => ({ label: name, value: name }))(el)
  : null
);

export default class Widget extends React.Component {
  constructor() {
    super();
    this.state = new State({
      recording: null,
      serverURL: './data.json',
      availableProjects: null,
    });

    this.loadProjects();
  }

  loadProjects() {
    fetch(this.state.serverURL)
    .then(r => r.json())
    .then(prop('projects'))
    // Set projects is inside a function so that we use this.state at the
    // time of the response, rather than at the time of the request.
    .then(proj =>
      this.setState(
        setProjects(this.state, proj)
      )
    );
  }


  render() {
    const state = this.state;
    const timeTrackerClick = _ => this.setState(
      startStopRecording(new Date(), !isRecording(this.state), this.state)
    );

    const changeProject = ({ value }) => this.setState(
      selectProject(state, value)
    );

    const changeDeliverable = ({ value }) => this.setState(
      selectDeliverable(state, value)
    );

    return (
      <div className="TimeTracker">
        <div className="TimeTracker-timer">
          <div className="TimeTracker-timer-recording">
          </div>

          <div className="TimeTracker-timer-time">
            {recordingTime(this.state)}
          </div>
        </div>

        <div className="TimeTracker-projects">
          <Select
            name="form-field-name"
            value={toOption(selectedProject(state))}
            options={availableProjects(state).map(toOption)}
            onChange={changeProject}
          />
        </div>

        <div className="TimeTracker-deliverables">
          <Select
            name="form-field-name"
            value={toOption(selectedDeliverable(state))}
            options={availableDeliverables(state).map(toOption)}
            onChange={changeDeliverable}
          />
        </div>

        <button
          className="TimeTracker-stop"
          onClick={timeTrackerClick}
        >
          {isRecording(this.state) ? 'Stop' : 'Start'}
        </button>
      </div>
    );
  }
}
