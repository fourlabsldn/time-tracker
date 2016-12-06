/* eslint-disable no-nested-ternary */
import React from 'react';
import Select from 'react-select';
import { pipe, prop, path } from 'ramda';
import Timer from './Timer';

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
  allDeliverables,
  recording,
  isRecording,
  isMinimised,
}) => {
  const timeTrackerClick = _ =>
    store.dispatch(startStopRecording(new Date(), !isRecording));
  const changeProject = (option) =>
    store.dispatch(selectProject(option ? option.value : null));
  const changeDeliverable = (option) =>
    store.dispatch(selectDeliverable(option ? option.value : null));

  console.log(recordingsInfo);
  return (
    <div className={`TimeTracker ${isMinimised ? 'TimeTracker--minimised' : ''}`}>
      <div
        className={`TimeTracker-timer ${isRecording ? 'TimeTracker-timer--recording' : ''}`}
        onClick={_ => store.dispatch(toggleMinimised(!isMinimised))}
      >
        <Timer
          startTime={recording ? recording.startTime : null}
          intervals={recording ? recording.intervals : []}
        />
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
            options={allDeliverables.map(toOption)}
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

        <div>
        {recordingsInfo.map(path(['project', 'name']))}
        </div>
      </div>
    </div>
  );
};


// Widget.propTypes = {
//   store: React.PropTypes.object,
//
//   // props
//   recordingsInfo: React.PropTypes.array.required,
//   selectedProject: React.PropTypes.object,
//   allProjects: React.PropTypes.array.required,
//   selectedDeliverable: React.PropTypes.object,
//   allDeliverables: React.PropTypes.array.required,
//   recording: React.PropTypes.object,
//   isRecording: React.PropTypes.bool.required,
//   isMinimised: React.PropTypes.bool.required,
// };

export default Widget;
