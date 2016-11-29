
/**
 * @constructor StartStopTimer
 * @param  {Date} date
 * @param  {Boolean} start
 */
function StartStopTimer(time, start) {
  this.time = time;
  this.start = start;
}

/**
 * @constructor FetchProjects
 * @param  {RemoteData} fetchStatus
 */
function FetchProjects(fetchStatus) {
  this.fetchStatus = fetchStatus;
}

/**
 * @constructor FetchRecording
 * @param  {RemoteData} fetchStatus
 */
function FetchRecording(fetchStatus) {
  this.fetchStatus = fetchStatus;
}

/**
 * @constructor LoadRecordingFromLocalStorage
 * @param  {RemoteData} fetchStatus
 */
function LoadRecordingFromLocalStorage(fetchStatus) {
  this.fetchStatus = fetchStatus;
}

/**
 * @constructor SaveRecordingToLocalStorage
 * @param  {RemoteData} saveStatus
 */
function SaveRecordingToLocalStorage(saveStatus) {
  this.saveStatus = saveStatus;
}

export default {
  StartStopTimer: (...args) => new StartStopTimer(...args),
  FetchProjects: (...args) => new FetchProjects(...args),
  FetchRecording: (...args) => new FetchRecording(...args),
  LoadRecordingFromLocalStorage: (...args) => new LoadRecordingFromLocalStorage(...args),
  SaveRecordingToLocalStorage: (...args) => new SaveRecordingToLocalStorage(...args),
};
