/* eslint-disable new-cap */
import { pathOr, pipe, curry, reduce, concat, map, lt, propOr, propEq, filter } from 'ramda';
import { Project, Recording } from '../../types';
import Immutable from 'seamless-immutable';

export const updateAt = curry((keyArray, newVal, obj) => {
  const deepNewVal = keyArray.reduceRight(
    (result, key) => ({ [key]: result })
    , newVal
  );

  return Immutable(obj).merge(deepNewVal, { deep: true });
});

export const selectedProject = pathOr(null, ['selectedProject']);

export const unselectedProjects = pathOr([], ['unselectedProjects']);

export const selectedDeliverable = pathOr(null, ['selectedProject', 'selectedDeliverable']);

export const unselectedDeliverables = pathOr([], ['selectedProject', 'unselectedDeliverables']);


export const selectedRecording = pathOr(null, [
  'selectedProject',
  'selectedDeliverable',
  'recording',
]);

export const allSelectedProjectDeliverables =
  pipe(selectedProject, Project.getDeliverables);

export const allProjects = model => (
    selectedProject(model)
    ? unselectedProjects(model).concat(selectedProject(model))
    : unselectedProjects(model)
  );

export const recordingsInfo = model => {
  const nonZeroRecordingTime = pipe(
    propOr(null, 'recording'),
    Recording.totalTime,
    lt(0), // Int -> Bool. Whether zero is less than the number that will be passed
  );

  const projectRecordingInfos = project => pipe(
    Project.getDeliverables,
    map(d => ({ project, deliverable: d, recording: d.recording }))
  )(project);

  const all = pipe(
    allProjects,
    map(projectRecordingInfos),
    reduce(concat, [])
  )(model);

  return all.filter(nonZeroRecordingTime);
};

export const getProject = curry((projectName, model) => pipe(
  allProjects,
  filter(propEq('name', projectName))
)(model));

export const getDeliverable = curry((deliverableName, projectName, model) => pipe(
  getProject(projectName),
  Project.getDeliverables,
  filter(propEq('name', deliverableName))
)(model));


export const updateProject = curry((project, model, newProject) => {
  const projectName = Project.getName(project);
  if (!(model && projectName && newProject)) {
    return model;
  }

  const sameProjectName = propEq('name', projectName);
  const updatingSelectedProject = projectName === propOr(null, 'name', model.selectedProject);
  const updatingUnselectedProject = !!unselectedProjects(model).find(sameProjectName);

  if (updatingSelectedProject) {
    return updateAt(
      ['selectedProject'],
      newProject,
      model
    );
  } else if (updatingUnselectedProject) {
    const newUnselectedProjects = unselectedProjects(model)
      .map(p => (sameProjectName(p) ? newProject : p));

    return updateAt(
      ['unselectedProjects'],
      newUnselectedProjects,
      model
    );
  }

  return model;
});
//
//
// export const updateRecording = curry((deliverable, project, model, newRecording) => {
//   const proj = allProjects(model)
//     .find(propEq('name', Project.getName(project)));
//   const deliv = Project.getDeliverables(proj)
//     .find(propEq('name', Deliverable.getName(deliverable)));
//
//   return pipe(
//     Deliverable.setRecording(deliv),
//     Project.updateDeliverable(proj),
//     updateProject(project, model)
//   )(newRecording);
// });
