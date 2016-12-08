//
//    ACTION CREATORS
//

export const toggleRecording = (project, deliverable) => ({
  type: 'WIDGET_toggleRecording',
  project,
  deliverable,
});
export const selectDeliverable = (deliverableName) => ({
  type: 'WIDGET_selectDeliverable',
  deliverableName,
});
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
