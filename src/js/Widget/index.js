/* eslint-disable no-nested-ternary */
import View from './view';
import { connect } from 'react-redux';
import {
  allGroups,
  selectedProject,
  selectedDeliverable,
  selectedRecording,
  allProjects,
} from './update/utils';

// Hook things up here.
const mapStateToProps = (model) => { // eslint-disable-line complexity
  return {
    allGroups: allGroups(model),
    selectedGroup: {
      recording: selectedRecording(model),
      project: selectedProject(model),
      deliverable: selectedDeliverable(model),
    },
    allProjects: allProjects(model),
    isMinimised: model.minimised,
  };
};

const mapDispatchToProps = (dispatch) => ({ dispatch });

const Widget = connect(
  mapStateToProps,
  mapDispatchToProps,
)(View);

export default Widget;
