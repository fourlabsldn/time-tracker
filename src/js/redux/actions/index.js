/* eslint-disable new-cap */
import { typeCheckers, Validation } from '../../types';
import { pipe } from 'ramda';

/**
 * @constructor StartStopTimer
 * @param  {Date} date
 * @param  {Boolean} start
 */
export function startStopTimer(time, start) {
  pipe(
    Validation.map(_ => typeCheckers.date(time)),
    Validation.map(_ => typeCheckers.bool(start)),
    Validation.throwFailure // throw with failure value if failed.
  )(Validation.Success());

  return {
    type: 'StartStopTimer',
    time,
    start,
  };
}

export const fetchProjects = _ => ({ type: 'FetchProjects' });

/**
 * @constructor fetchProjectsStatusChange
 * @param  {RemoteData} fetchStatus
 */
export function fetchProjectsStatusChange(fetchStatus) {
  pipe(
    typeCheckers.remoteData,
    Validation.throwFailure,
  )(fetchStatus);

  return {
    type: 'FetchProjectsStatusChange',
    fetchStatus,
  };
}


export const fetchRecording = _ => ({ type: 'FetchRecording' });

/**
 * @constructor fetchRecordingStatusChange
 * @param  {RemoteData} fetchStatus
 */
export function fetchRecordingStatusChange(fetchStatus) {
  pipe(
    typeCheckers.remoteData,
    Validation.throwFailure,
  )(fetchStatus);

  return {
    type: 'FetchRecordingStatusChange',
    fetchStatus,
  };
}

/**
 * @constructor loadRecordingFromLocalStorage
 * @param  {RemoteData} fetchStatus
 */
export function loadRecordingFromLocalStorage(fetchStatus) {
  pipe(
    typeCheckers.remoteData,
    Validation.throwFailure,
  )(fetchStatus);

  return {
    type: 'LoadRecordingFromLocalStorage',
    fetchStatus,
  };
}

/**
 * @constructor saveRecordingToLocalStorage
 * @param  {RemoteData} saveStatus
 */
export function saveRecordingToLocalStorage(saveStatus) {
  pipe(
    typeCheckers.remoteData,
    Validation.throwFailure,
  )(saveStatus);

  return {
    type: 'SaveRecordingToLocalStorage',
    saveStatus,
  };
}

export function selectProject({ name }) {
  pipe(
    typeCheckers.string,
    Validation.throwFailure,
  )(name);

  return {
    type: 'SelectProject',
    name,
  };
}

export function selectDeliverable({ name }) {
  pipe(
    typeCheckers.string,
    Validation.throwFailure,
  )(name);

  return {
    type: 'SelectDeliverable',
    name,
  };
}
