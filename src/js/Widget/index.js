/* eslint-disable no-nested-ternary */
import View from './view';
import { connect } from 'react-redux';
import {
  selectedProject,
  selectedDeliverable,
  allProjects,
  allSelectedProjectDeliverables,
  selectedRecording,
  recordingsInfo,
} from './update/utils';

// Hook things up here.
const mapStateToProps = (model) => { // eslint-disable-line complexity
  return {
    recordingsInfo: recordingsInfo(model),
    selectedProject: selectedProject(model),
    selectedDeliverable: selectedDeliverable(model),
    allProjects: allProjects(model),
    allSelectedProjectDeliverables: allSelectedProjectDeliverables(model),
    selectedRecording: selectedRecording(model),
    isMinimised: model.minimised,
  };
};

const mapDispatchToProps = (dispatch) => ({ dispatch });

const Widget = connect(
  mapStateToProps,
  mapDispatchToProps,
)(View);

export default Widget;
