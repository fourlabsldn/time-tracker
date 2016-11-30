/* eslint-disable new-cap */
import { typeCheckers, Validation } from '../../types';
import { pipe } from 'ramda';

/**
 * @constructor StartStopTimer
 * @param  {Date} date
 * @param  {Boolean} start
 */
export function StartStopTimer(time, start) {
  pipe(
    Validation.map(_ => typeCheckers.date(time)),
    Validation.map(_ => typeCheckers.bool(start)),
    Validation.throwFailure // throw with failure value if failed.
  )(Validation.Success());

  this.time = time;
  this.start = start;
}

export function FetchProjects() {}

/**
 * @constructor FetchProjectsStatusChange
 * @param  {RemoteData} fetchStatus
 */
export function FetchProjectsStatusChange(fetchStatus) {
  pipe(
    typeCheckers.remoteData,
    Validation.throwFailure,
  )(fetchStatus);

  this.fetchStatus = fetchStatus;
}


export function FetchRecording() {}

/**
 * @constructor FetchRecordingStatusChange
 * @param  {RemoteData} fetchStatus
 */
export function FetchRecordingStatusChange(fetchStatus) {
  pipe(
    typeCheckers.remoteData,
    Validation.throwFailure,
  )(fetchStatus);

  this.fetchStatus = fetchStatus;
}

/**
 * @constructor LoadRecordingFromLocalStorage
 * @param  {RemoteData} fetchStatus
 */
export function LoadRecordingFromLocalStorage(fetchStatus) {
  pipe(
    typeCheckers.remoteData,
    Validation.throwFailure,
  )(fetchStatus);

  this.fetchStatus = fetchStatus;
}

/**
 * @constructor SaveRecordingToLocalStorage
 * @param  {RemoteData} saveStatus
 */
export function SaveRecordingToLocalStorage(saveStatus) {
  pipe(
    typeCheckers.remoteData,
    Validation.throwFailure,
  )(saveStatus);

  this.saveStatus = saveStatus;
}

export const startStopTimer = (...args) => new StartStopTimer(...args);
export const fetchProjects = (...args) => new FetchProjects(...args);
export const fetchProjectsStatusChange = (...args) => FetchProjectsStatusChange(...args);
export const fetchRecording = (...args) => FetchRecording(...args);
export const fetchRecordingStatusChange = (...args) => new FetchRecordingStatusChange(...args);
export const loadRecordingFromLocalStorage = (...args) =>
  new LoadRecordingFromLocalStorage(...args);
export const saveRecordingToLocalStorage = (...args) => new SaveRecordingToLocalStorage(...args);
