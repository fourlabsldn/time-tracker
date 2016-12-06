/* eslint-disable new-cap */
import { pathOr, not, pipe, curry, propOr, map, reduce, concat, isNil } from 'ramda';
import { Maybe } from '../../types';
import Immutable from 'seamless-immutable';

export const updateAt = curry((keyArray, newVal, obj) => {
  const deepNewVal = keyArray.reduceRight(
    (result, key) => ({ [key]: result })
    , newVal
  );

  return Immutable(obj).merge(deepNewVal, { deep: true });
});

// ============================ Recording ===================================

// (Recording | null) -> Array[Deliverable]
export const isRecording = pipe(
  Maybe.of,
  Maybe.map(propOr(null, 'startTime')),
  Maybe.map(isNil),
  Maybe.map(not),
  Maybe.withDefault(false)
);


// ============================ Project ===================================

// (Project | null) -> Array[Deliverable]
export const allDeliverables = project => {
  if (!project) { return []; }
  const unselected = project.unselectedDeliverables || [];
  return project.selectedDeliverable
  ? unselected.concat(project.selectedDeliverable)
  : unselected;
};

// ============================ MODEL ===================================
// Model -> Project | null
export const selectedProject = pathOr(null, ['selectedProject']);
// Model -> [Project]
export const unselectedProjects = pathOr([], ['unselectedProjects']);
// Model -> [Project]
export const allProjects = model => {
  const unselected = model.unselectedProjects || [];
  return model.selectedProject
  ? unselected.concat(model.selectedProject)
  : unselected;
};

// Model -> Deliverable | null
export const selectedDeliverable = pathOr(null, ['selectedProject', 'selectedDeliverable']);
// Model -> Recording | null
export const selectedRecording = pathOr(null, [
  'selectedProject',
  'selectedDeliverable',
  'recording',
]);
// Model -> [{ project, deliverable, recording }]
export const allGroups = model => {
  const projectGroups = project => pipe(
    allDeliverables,
    map(deliverable => ({ project, deliverable, recording: deliverable.recording })),
  )(project);

  return pipe(
    allProjects,
    map(projectGroups),
    reduce(concat, []),
  )(model);
};
