/* eslint-disable no-nested-ternary */
import View from './view';
import { pipe } from 'ramda';
import { connect } from 'react-redux';
import {
  selectedProject,
  allDeliverables,
  allProjects,
  allRecordings,
} from './update/utils';

// Hook things up here.
const mapStateToProps = (model) => { // eslint-disable-line complexity
  return {
    selectedProject: selectedProject(model),
    selectedProjectDeliverables: pipe(selectedProject, allDeliverables)(model),
    allProjects: allProjects(model),
    isMinimised: model.minimised,
    allRecordings: allRecordings(model),
  };
};

const mapDispatchToProps = (dispatch) => ({ dispatch });

const Widget = connect(
  mapStateToProps,
  mapDispatchToProps,
)(View);

export default Widget;
