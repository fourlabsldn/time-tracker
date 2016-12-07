/* eslint-disable no-nested-ternary, react/prop-types */
import React from 'react';
import Select from 'react-select';
import { pipe, prop, path } from 'ramda';
import Timer from './Timer';
import RecordingRow from './RecordingRow';
import { Recording } from '../../types';

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
            disabled={isRecording}
          />
        </div>

        <div className="TimeTracker-deliverables">
          <Select
            name="form-field-name"
            value={toOption(selectedDeliverable)}
            options={allSelectedProjectDeliverables.map(toOption)}
            onChange={changeDeliverable}
            disabled={isRecording}
          />
        </div>

        <button
          className="TimeTracker-stop"
          onClick={timeTrackerClick}
          disabled={!selectedDeliverable}
        >
          {isRecording ? 'Stop' : 'Start'}
        </button>

        {recordingsInfo.map((info) =>
          (<RecordingRow
            key={info.project.name + info.deliverable.name}
            {...info}
          />))
        }
      </div>
    </div>
  );
};

export default Widget;
