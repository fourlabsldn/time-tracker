/* eslint-disable new-cap */
import { pathOr, pipe, curry, reduce, concat, map, lt, prop } from 'ramda';
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
    prop('recording'),
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
