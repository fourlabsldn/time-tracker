//
//    ACTION CREATORS
//
import { curry } from 'ramda';

export const toggleRecording = curry((project, deliverable) => ({
  type: 'WIDGET_toggleRecording',
  project,
  deliverable,
}));
export const selectDeliverable = curry((project, deliverable) => ({
  type: 'WIDGET_selectDeliverable',
  project,
  deliverable,
}));
export const selectProject = (projectName) => ({
  type: 'WIDGET_selectProject',
  projectName,
});
export const setProjects = (rawProjects) => ({
  type: 'WIDGET_setProjects',
  rawProjects,
});
export const toggleMinimised = (minimise) => ({
  type: 'WIDGET_toggleMinimised',
  minimise,
});
