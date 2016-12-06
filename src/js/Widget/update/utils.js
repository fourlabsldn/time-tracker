/* eslint-disable new-cap */
import { pathOr, pipe, curry, propOr, concat, map, filter, isNil } from 'ramda';
import { Maybe } from '../../types';
import Immutable from 'seamless-immutable';

export const updateAt = curry((keyArray, newVal, obj) => {
  const deepNewVal = keyArray.reduceRight(
    (result, key) => ({ [key]: result })
    , newVal
  );

  return Immutable(obj).merge(deepNewVal, { deep: true });
});


// ============================ Project ===================================

// (Project | null) -> Array[Deliverable]
export const allDeliverables = project => pipe(
  Maybe.of,
  Maybe.map(propOr([], 'selectedDeliverable')),
  Maybe.map(concat(propOr([], 'unselectedDeliverables', project))),
  Maybe.withDefault([])
)(project);


// ============================ MODEL ===================================
// Model -> Project | null
export const selectedProject = pathOr(null, ['selectedProject']);
// Model -> [Project]
export const unselectedProjects = pathOr([], ['unselectedProjects']);
// Model -> Deliverable | null
export const selectedDeliverable = pathOr(null, ['selectedProject', 'selectedDeliverable']);
// Model -> [Deliverable]
export const unselectedDeliverables = pathOr([], ['selectedProject', 'unselectedDeliverables']);
// Model -> Recording | null
export const selectedRecording = pathOr(null, [
  'selectedProject',
  'selectedDeliverable',
  'recording',
]);
// Model -> Boolean
export const isRecording = pipe(selectedRecording, propOr(null, 'startTime'), isNil);

// Model -> [Project]
export const allProjects = model => pipe(
  unselectedProjects,
  concat(selectedProject(model) || [])
)(model);

// Model -> [Recording]
export const allRecordings = model => {
  const runningRecording = recording => (
    recording.startTime
    ? { recording }
    : null
  );

  const recordingDeliverable = deliverable => (
    runningRecording(deliverable)
    ? Object.assign({}, { deliverable }, runningRecording(deliverable))
    : null
  );

  const recordingDeliverables = project => pipe(
    allDeliverables,
    recordingDeliverable,
    filter(isNil),
    map(v => Object.assign({}, { project }, v))
  )(project);

  return pipe(
    allProjects,
    recordingDeliverables,
  )(model);
};
