/* eslint-disable no-nested-ternary */
import View from './view';
import { connect } from 'react-redux';
import {
  selectedProject,
  selectedDeliverable,
  allProjects,
  allDeliverables,
  recording,
  isRecording,
  recordingsInfo,
} from './update/utils';

// Hook things up here.
const mapStateToProps = (model) => { // eslint-disable-line complexity
  return {
    recordingsInfo: recordingsInfo(model),
    selectedProject: selectedProject(model),
    allProjects: allProjects(model),
    selectedDeliverable: selectedDeliverable(model),
    allDeliverables: allDeliverables(model),
    recording: recording(model),
    isRecording: isRecording(model),
    isMinimised: model.minimised,
  };
};

const mapDispatchToProps = (dispatch) => ({ dispatch });

const Widget = connect(
  mapStateToProps,
  mapDispatchToProps,
)(View);

export default Widget;
