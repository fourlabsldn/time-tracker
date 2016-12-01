/* eslint-disable no-nested-ternary */
import React from 'react';
import Select from 'react-select';
import { State } from './types';
import Timer from './Timer';
import {
  startStopRecording,
  selectDeliverable,
  selectProject,
  setProjects,
} from './Widget.update';
import { pipe, prop } from 'ramda';


const selectedProject = ({ recording }) => (
  recording
    ? recording.project
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
    ? recording.project.selectedDeliverable
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
      startStopRecording(this.state, new Date(), !isRecording(this.state))
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

          <Timer
            startTime={state.recording ? state.recording.startTime : null}
            intervals={state.recording ? state.recording.intervals : []}
          />
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
          disabled={!selectedDeliverable(state)}
        >
          {isRecording(this.state) ? 'Stop' : 'Start'}
        </button>
      </div>
    );
  }
}
