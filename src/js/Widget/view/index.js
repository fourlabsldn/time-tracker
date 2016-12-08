/* eslint-disable no-nested-ternary, react/prop-types */
import React from 'react';
import Select from 'react-select';
import { pipe, propOr, sortBy, propEq, find } from 'ramda';
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

// Option -> [Project] -> Project
const sameNameAsOptionValue = pipe(
  propOr(null, 'value'),
  propEq('name'),
  find,
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

  // { label<String>, value<String>} -> Action
  const changeProject = (option) => pipe(
    sameNameAsOptionValue(option),
    selectProject,
    action => store.dispatch(action),
  )(allProjects);

  // { label<String>, value<String>} -> Action
  const changeDeliverable = (option) => pipe(
    Project.getDeliverables,
    sameNameAsOptionValue(option),
    selectDeliverable(selectedProject),
    action => store.dispatch(action),
  )(selectedProject);

  return (
    <div className={`TimeTracker ${isMinimised ? 'TimeTracker--minimised' : ''}`}>
      <div
        className={
          `TimeTracker-timer ${isRecording
              ? 'TimeTracker-timer--recording'
              : ''}`
          }
        onClick={_ => store.dispatch(toggleMinimised(!isMinimised))}
      >
        <Timer recording={selectedRecording} />
      </div>
      <div className="TimeTracker-fields">
        <div className="TimeTracker-projects">
          <Select
            name="form-field-name"
            value={toOption(selectedProject)}
            options={sortBy(propOr('', 'label'), projectOptions)}
            onChange={changeProject}
          />
          <a
            href={Project.getUrl(selectedProject)}
            className={`TimeTracker-projects-link btn btn-${
              selectedProject ? 'danger' : 'disabled'
            } fa fa-link`}
          />
        </div>

        <div className="TimeTracker-deliverables">
          <Select
            name="form-field-name"
            value={toOption(selectedDeliverable)}
            options={sortBy(propOr('', 'label'), deliverableOptions)}
            onChange={changeDeliverable}
          />
          <a
            href={Deliverable.getUrl(selectedDeliverable)}
            className="btn btn-danger fa fa-link"
            className={`TimeTracker-deliverables-link btn btn-${
              selectedDeliverable ? 'danger' : 'disabled'
            } fa fa-link`}
          />
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
