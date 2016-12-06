//
//    ACTION CREATORS
//

export const startStopRecording = (time, shouldStart) => ({
  type: 'WIDGET_startStopRecording',
  time,
  shouldStart,
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
