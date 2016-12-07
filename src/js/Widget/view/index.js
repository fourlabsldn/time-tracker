/* eslint-disable no-nested-ternary, react/prop-types */
import React from 'react';
import Select from 'react-select';
import { pipe, prop } from 'ramda';
import Timer from './Timer';
import RecordingRow from './RecordingRow';
import { Recording, Project, Deliverable } from '../../types';

import {
  startStopRecording,
  selectDeliverable,
  selectProject,
  toggleMinimised,
} from '../actions';

const toOption = el => (el
  ? pipe(prop('name'), name => ({ label: name, value: name }))(el)
  : null
);

// Object -> String : This creates a string useful in sorting and identifying
//                    the project deliverable recording
const stringIdentifier = ({ project, deliverable, recording }) => {
  return Project.getName(project) +
    Deliverable.getName(deliverable);
};

const Widget = ({ // eslint-disable-line complexity
  store,
  // props
  recordingsInfo,
  selectedProject,
  allProjects,
  selectedDeliverable,
  allSelectedProjectDeliverables,
  selectedRecording,
  isMinimised,
}) => {
  const isRecording = Recording.isRecording(selectedRecording);

  const timeTrackerClick = _ =>
    store.dispatch(startStopRecording(new Date(), !isRecording));
  const changeProject = (option) =>
    store.dispatch(selectProject(option ? option.value : null));
  const changeDeliverable = (option) =>
    store.dispatch(selectDeliverable(option ? option.value : null));

  return (
    <div className={`TimeTracker ${isMinimised ? 'TimeTracker--minimised' : ''}`}>
      <div
        className={'TimeTracker-timer'}
        onClick={_ => store.dispatch(toggleMinimised(!isMinimised))}
      >
        <Timer recording={selectedRecording} />
      </div>
      <div className="TimeTracker-fields">
        <div className="TimeTracker-projects">
          <Select
            name="form-field-name"
            value={toOption(selectedProject)}
            options={allProjects.map(toOption)}
            onChange={changeProject}
          />
          <i className="btn btn-danger fa fa-link" />
        </div>

        <div className="TimeTracker-deliverables">
          <Select
            name="form-field-name"
            value={toOption(selectedDeliverable)}
            options={allSelectedProjectDeliverables.map(toOption)}
            onChange={changeDeliverable}
          />
          <i className="btn btn-danger fa fa-link" />
        </div>

        <button
          className="TimeTracker-stop"
          onClick={timeTrackerClick}
          disabled={!selectedDeliverable}
        >
          {isRecording ? 'Stop' : 'Start'}
        </button>

        {recordingsInfo
          .sort((info1, info2) => stringIdentifier(info1) < stringIdentifier(info2))
          .map((info) =>
          (<RecordingRow
            key={stringIdentifier(info)}
            {...info}
          />))
        }
      </div>
    </div>
  );
};

export default Widget;
