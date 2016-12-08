/* eslint-disable no-nested-ternary, react/prop-types */
import React from 'react';
import Select from 'react-select';
import { pipe, propOr, sortBy } from 'ramda';
import Timer from './Timer';
import RecordingRow from './RecordingRow';
import { Recording, Project, Deliverable } from '../../types';

import {
  toggleRecording,
  selectDeliverable,
  selectProject,
  toggleMinimised,
} from '../actions';

const toOption = el => (el
  ? pipe(propOr(null, 'name'), name => ({ label: name, value: name }))(el)
  : null
);

// Object -> String : This creates a string useful in sorting and identifying
//                    the project deliverable recording
const stringIdentifier = ({ project, deliverable }) => {
  return Project.getName(project) +
    Deliverable.getName(deliverable);
};

const Widget = ({ // eslint-disable-line complexity
  store,
  // props
  selectedProject,
  allProjects,
  recordingsInfo,
  isMinimised,
}) => {
  const selectedDeliverable = Project.getSelectedDeliverable(selectedProject);
  const selectedRecording = Deliverable.getRecording(selectedDeliverable);
  const isRecording = Recording.isRecording(selectedRecording);
  const projectOptions = allProjects.map(toOption);
  const deliverableOptions = Project.getDeliverables(selectedProject).map(toOption);

  const timeTrackerClick = _ =>
    store.dispatch(toggleRecording(selectedProject, selectedDeliverable));
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
            options={sortBy('label', projectOptions)}
            onChange={changeProject}
          />
          <i className="btn btn-danger fa fa-link" />
        </div>

        <div className="TimeTracker-deliverables">
          <Select
            name="form-field-name"
            value={toOption(selectedDeliverable)}
            options={sortBy('label', deliverableOptions)}
            onChange={changeDeliverable}
          />
          <i className="btn btn-danger fa fa-link" />
        </div>

        <button
          className={`TimeTracker-start-stop btn ${isRecording ? 'btn-danger' : 'btn-default'}`}
          onClick={timeTrackerClick}
          disabled={!selectedDeliverable}
        >
          {isRecording ? 'Pause' : 'Start'}
        </button>

        {recordingsInfo
          .sort((info1, info2) => stringIdentifier(info1) < stringIdentifier(info2))
          .map((info) =>
          (<RecordingRow
            key={stringIdentifier(info)}
            store={store}
            {...info}
          />))
        }
      </div>
    </div>
  );
};

export default Widget;
