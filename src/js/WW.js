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

const toOption = el => (
  el
  ? pipe(prop('name'), name => ({ label: name, value: name }))(el)
  : null
);

export default class Widget extends React.Component {
  constructor() {
    super();
    this.state = {
      model: State.of({
        minimised: false,
        serverURL: './data.json',
        availableProjects: [],
        selectedProject: null,
      }),
    };

    this.loadProjects();
  }

  loadProjects() {
    fetch(State.getServerUrl(this.state.model))
    .then(r => r.json())
    .then(prop('projects'))
    // Set projects is inside a function so that we use this.state.model at the
    // time of the response, rather than at the time of the request.
    .then(proj =>
      this.setState({
        model: setProjects(this.state.model, proj),
      })
    );
  }


  render() {
    const model = this.state.model;
    const isRecording = !!model.recording && !!model.recording.startTime;

    const timeTrackerClick = _ => this.setState({
      model: startStopRecording(model, new Date(), !isRecording),
    });

    const changeProject = (option) => this.setState({
      model: selectProject(model, option ? option.value : null),
    });
    const changeDeliverable = (option) => this.setState({
      model: selectDeliverable(model, option ? option.value : null),
    });

    const toggleMinimise = () => this.setState({
      minimised: !this.state.minimised,
    });

    return (
      <div className={`TimeTracker ${this.state.minimised ? 'TimeTracker--minimised' : ''}`}>
        <div
          className={`TimeTracker-timer ${isRecording ? 'TimeTracker-timer--recording' : ''}`}
          onClick={toggleMinimise}
        >
          <Timer
            startTime={model.recording ? model.recording.startTime : null}
            intervals={model.recording ? model.recording.intervals : []}
          />
        </div>
        <div className="TimeTracker-fields">
          <div className="TimeTracker-projects">
            <Select
              name="form-field-name"
              value={toOption(selectedProject(model))}
              options={availableProjects(model).map(toOption)}
              onChange={changeProject}
              disabled={isRecording}
            />
          </div>

          <div className="TimeTracker-deliverables">
            <Select
              name="form-field-name"
              value={toOption(selectedDeliverable(model))}
              options={availableDeliverables(model).map(toOption)}
              onChange={changeDeliverable}
              disabled={isRecording}
            />
          </div>

          <button
            className="TimeTracker-stop"
            onClick={timeTrackerClick}
            disabled={!selectedDeliverable(model)}
          >
            {isRecording ? 'Stop' : 'Start'}
          </button>
        </div>
      </div>
    );
  }
}