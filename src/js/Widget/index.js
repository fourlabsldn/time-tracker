/* eslint-disable no-nested-ternary */

import actions from './actions';
import View from './view';
import { connect } from 'react-redux';
import { pipe } from 'ramda';

// Hook things up here.
const mapStateToProps = (model) => { // eslint-disable-line complexity
  const selectedProject = model.selectedProject ?
    model.selectedProject :
    null;

  const selectedDeliverable = !selectedProject ? null :
    !selectedProject.selectedDeliverable ? null :
    selectedProject.selectedDeliverable;

  const recording = selectedDeliverable
    ? selectedDeliverable.recording
    : null;

  return {
    selectedProject,
    projects: selectedProject ?
      (model.projects || [])
      .concat([selectedProject]) :
      (model.projects || []),

    selectedDeliverable,
    deliverables:
      !selectedProject ? [] :
      !selectedDeliverable ? (selectedProject.deliverables || [])
    : (selectedProject.deliverables || [])
      .concat([selectedDeliverable]),
    recording,
    isRecording: recording && recording.startTime,
    isMinimised: model.minimised,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    startStopRecording: pipe(actions.startStopRecording, dispatch),
    selectDeliverable: pipe(actions.selectDeliverable, dispatch),
    selectProject: pipe(actions.selectProject, dispatch),
    setProjects: pipe(actions.setProjects, dispatch),
    toggleMinimised: pipe(actions.toggleMinimised, dispatch),
  };
};

const Widget = connect(
  mapStateToProps,
  mapDispatchToProps,
)(View);

export default Widget;
