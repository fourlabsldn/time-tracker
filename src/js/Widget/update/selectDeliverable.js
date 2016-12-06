import Immutable from 'seamless-immutable';
import { pathOr } from 'ramda';
import {
  selectedProject,
  isRecording,
  allDeliverables,
} from './utils';

export default (model, action) => {
  if (!selectedProject(model) || isRecording(model)) {
    return model;
  }

  const


}

export const selectDeliverable = curry((state, deliverableName) => {

  const allProjectDeliverables = project.selectedDeliverable ?
    [project.selectedDeliverable, ...project.deliverables] :
    project.deliverables;

  const chosenDeliverable = allProjectDeliverables.find(propEq('name', deliverableName));

  assert(
    chosenDeliverable || deliverableName === null,
    `No deliverables found with name ${deliverableName}`
  );

  const newProject = deliverableName === null ?
    new Project({
      name: project.name,
      url: project.url,
      deliverables: allProjectDeliverables,
      selectedDeliverable: null,
    }) :
    new Project({
      name: project.name,
      url: project.url,
      deliverables: allProjectDeliverables.filter(v => !equals(chosenDeliverable)(v)),
      selectedDeliverable: chosenDeliverable,
    });

  // TODO: This is just wrong. When you change deliverables you shouldn't
  // start everything from the beginning. It shouldpick up where you left off.
  const newRecording = new Recording({
    project: newProject,
    startTime: null,
    intervals: [],
  });

  return new State({
    recording: newRecording,
    serverURL: state.serverURL,
    availableProjects: state.availableProjects,
  });
});
