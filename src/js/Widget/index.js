/* eslint-disable no-nested-ternary */

import actions from './actions';
import View from './view';
import { connect } from 'react-redux';
import { pipe } from 'ramda';
import {
  selectedProject,
  selectedDeliverable,
  allProjects,
  allDeliverables,
  recording,
  isRecording,
} from './update/utils';

// Hook things up here.
const mapStateToProps = (model) => { // eslint-disable-line complexity
  return {
    selectedProject: selectedProject(model),
    allProjects: allProjects(model),
    selectedDeliverable: selectedDeliverable(model),
    allDeliverables: allDeliverables(model),
    recording: recording(model),
    isRecording: isRecording(model),
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
