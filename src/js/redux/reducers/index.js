/* eslint-disable no-nested-ternary */
import { Validation, typeCheckers } from '../../types';
import { pipe } from 'ramda';
import {
  StartStopTimer,
  FetchProjects,
  FetchRecording,
  LoadRecordingFromLocalStorage,
  SaveRecordingToLocalStorage,
} from '../action-types';

import startStopTimer from './startStopTimer';
import fetchProjects from './fetchProjects';
import fetchRecording from './fetchRecording';
import loadRecordingFromLocalStorage from './loadRecordingFromLocalStorage';
import saveRecordingToLocalStorage from './saveRecordingToLocalStorage';

const reducer = (state, action) => ( // eslint-disable-line complexity
    action instanceof StartStopTimer ? startStopTimer(state, action)
    : action instanceof FetchProjects ? fetchProjects(state, action)
    : action instanceof FetchRecording ? fetchRecording(state, action)
    : action instanceof LoadRecordingFromLocalStorage ? loadRecordingFromLocalStorage(state, action)
    : action instanceof SaveRecordingToLocalStorage ? saveRecordingToLocalStorage(state, action)
    : null // something went wrong.
);

export default (...args) => pipe(
  reducer(...args),
  typeCheckers.stateTypeCheck,
  Validation.throwFailure,
  // will never use the default value because if it
  // were a failure it would have thrown in the step above.
  Validation.withDefault(null)
);
