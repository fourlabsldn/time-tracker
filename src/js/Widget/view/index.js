/* eslint-disable no-nested-ternary */
import React from 'react';
import Select from 'react-select';
import { pipe, prop, pathOr } from 'ramda';
import Timer from './Timer';
import { isRecording, selectedRecording, allDeliverables } from '../update/utils';

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
  selectedGroup,
  allProjects,
  isMinimised,
}) => {
  console.log(selectedGroup)
  const timeTrackerClick = _ =>
    store.dispatch(startStopRecording(new Date(), !isRecording(selectedGroup.recording)));
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
        <Timer
          startTime={pathOr(null, ['recording', 'startTime'], selectedGroup.recording)}
          intervals={pathOr([], ['recording', 'intervals'], selectedGroup.recording)}
        />
      </div>
      <div className="TimeTracker-fields">
        <div className="TimeTracker-projects">
          <Select
            name="form-field-name"
            value={toOption(selectedGroup.project)}
            options={allProjects.map(toOption).filter(v => !!v)}
            onChange={changeProject}
            disabled={isRecording(selectedRecording)}
          />
        </div>

        <div className="TimeTracker-deliverables">
          <Select
            name="form-field-name"
            value={toOption(selectedGroup.deliverable)}
            options={allDeliverables(selectedGroup.project).map(toOption).filter(v => !!v)}
            onChange={changeDeliverable}
            disabled={isRecording(selectedGroup.recording)}
          />
        </div>

        <button
          className="TimeTracker-stop"
          onClick={timeTrackerClick}
          disabled={!selectedGroup.deliverable}
        >
          {isRecording(selectedGroup.recording) ? 'Stop' : 'Start'}
        </button>
      </div>
    </div>
  );
};


Widget.propTypes = {
  store: React.PropTypes.object,
  selectedGroup: React.PropTypes.object,
  allProjects: React.PropTypes.array,
  isMinimised: React.PropTypes.bool,
};

export default Widget;
