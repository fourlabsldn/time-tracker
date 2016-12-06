/* eslint-disable new-cap */
import { pathOr, pipe, curry, reduce, concat, map } from 'ramda';
import { Project } from '../../types';
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

export const recordingIntervals = pathOr([], [
  'selectedProject',
  'selectedDeliverable',
  'recording',
  'intervals',
]);

export const recordingStartTime = pathOr(null, [
  'selectedProject',
  'selectedDeliverable',
  'recording',
  'startTime',
]);

export const recording = pathOr(null, [
  'selectedProject',
  'selectedDeliverable',
  'recording',
]);

export const isRecording = pipe(recordingStartTime, v => !!v);

export const allDeliverables = model => (
  selectedDeliverable(model)
  ? unselectedDeliverables(model).concat(selectedDeliverable(model))
  : unselectedDeliverables(model)
);

export const allProjects = model => (
    selectedProject(model)
    ? unselectedProjects(model).concat(selectedProject(model))
    : unselectedProjects(model)
  );

export const recordingsInfo = model => {
  const projectRecordingInfos = project => pipe(
    Project.getDeliverables,
    map(d => ({ project, deliverable: d, recording: d.recording }))
  )(project);

  return pipe(
    allProjects,
    map(projectRecordingInfos),
    reduce(concat, [])
  )(model);
};
