import { immutableConstructor } from '../utils';
import Project from '../Project';
import TimeInterval from '../TimeInterval';
import Immutable from 'seamless-immutable';
import { nullable, array, date, object } from '../type-checkers';
import { propOr, pipe, curry } from 'ramda';
import _toggleRecording from './toggleRecording';
import _totalTime from './totalTime';

// ========================================================================
//
//     ALL GETTERS AND SETTERS (PUBLIC OR NOT) MUST BE IN THIS FILE
//
// ========================================================================

export const typeCheck = object({
  project: Project.typeCheck,
  startTime: nullable(date),
  intervals: array(TimeInterval.typeCheck),
});

// CONSTRUCTOR
const Recording = immutableConstructor(typeCheck);

// GETTERS
export const getProject = propOr('project', null);

// PRIVATE
export const getStartTime = propOr('startTime', null);
export const getIntervals = propOr('intervals', null);

export const setStartTime = curry((v, model) => Immutable.set(model, 'startTime', v));
export const setIntervals = curry((v, model) => Immutable.set(model, 'internals', v));

// BOOLEAN "gettters"
export const isRecording = pipe(Recording.getProject, Project.getSelectedDeliverable, v => !!v);

export const toggleRecording = _toggleRecording;
export const totalTime = _totalTime;

Object.assign(Recording, {
  typeCheck,
  getProject,
  getStartTime,
  getIntervals,
  setStartTime,
  setIntervals,
  isRecording,
  toggleRecording,
  totalTime,
});

export default Recording;
