/* eslint-disable no-nested-ternary */
import { Validation, typeCheckers } from '../../types';
import { pipe } from 'ramda';

import startStopTimer from './startStopTimer';
import fetchProjects from './fetchProjects';
import fetchProjectsStatusChange from './fetchProjectsStatusChange';
import fetchRecording from './fetchRecording';
import fetchRecordingStatusChange from './fetchRecordingStatusChange';
import loadRecordingFromLocalStorage from './loadRecordingFromLocalStorage';
import saveRecordingToLocalStorage from './saveRecordingToLocalStorage';
import selectProject from './selectProject';
import selectDeliverable from './selectDeliverable';

const reducer = (state, action) => ( // eslint-disable-line complexity
    action.type === 'StartStopTimer' ? startStopTimer(state, action)
    : action.type === 'FetchProjects' ? fetchProjects(state, action)
    : action.type === 'FetchProjectsStatusChange' ? fetchProjectsStatusChange(state, action)
    : action.type === 'FetchRecording' ? fetchRecording(state, action)
    : action.type === 'FetchRecordingStatusChange' ? fetchRecordingStatusChange(state, action)
    : action.type === 'LoadRecordingFromLocalStorage' ? loadRecordingFromLocalStorage(state, action)
    : action.type === 'SaveRecordingToLocalStorage' ? saveRecordingToLocalStorage(state, action)
    : action.type === 'SelectProject' ? selectProject(state, action)
    : action.type === 'SelectDeliverable' ? selectDeliverable(state, action)
    : state // something went wrong.
);

export default (state, action) => pipe(
  typeCheckers.stateTypeCheck,
  _ => (console.log(action) ? _ : _),
  Validation.throwFailure,
  // will never use the default value because if it
  // were a failure it would have thrown in the step above.
  Validation.withDefault(null)
)(reducer(state, action));
