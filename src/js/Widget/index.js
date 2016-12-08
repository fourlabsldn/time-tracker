/* eslint-disable no-nested-ternary */
import View from './view';
import { connect } from 'react-redux';
import {
  selectedProject,
  allProjects,
  recordingsInfo,
} from './update/utils';

// Hook things up here.
const mapStateToProps = (model) => { // eslint-disable-line complexity
  return {
    selectedProject: selectedProject(model),
    allProjects: allProjects(model),
    recordingsInfo: recordingsInfo(model),
    isMinimised: model.minimised,
  };
};

const mapDispatchToProps = (dispatch) => ({ dispatch });

const Widget = connect(
  mapStateToProps,
  mapDispatchToProps,
)(View);

export default Widget;
