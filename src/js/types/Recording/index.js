import { immutableConstructor, checkType } from '../utils';
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
  startTime: nullable(date),
  intervals: array(TimeInterval.typeCheck),
});

// CONSTRUCTOR
const Recording = immutableConstructor(typeCheck);

// PRIVATE GETTERS
export const getStartTime = propOr(null, 'startTime');
export const getIntervals = propOr(null, 'intervals');

// PRIVATE SETTERS
export const setStartTime = curry((v, model) => pipe(
  Immutable.set(model, 'startTime', v),
  checkType(typeCheck)
)());

export const setIntervals = curry((v, model) => pipe(
  Immutable.set(model, 'internals', v),
  checkType(typeCheck)
)());

// ===========================
// PUBLIC INTERFACE
// BOOLEAN "gettters"
export const isRecording = pipe(getStartTime, v => !!v);
export const toggleRecording = _toggleRecording;
export const totalTime = _totalTime;

Object.assign(Recording, {
  typeCheck,
  getStartTime,
  getIntervals,
  setStartTime,
  setIntervals,
  isRecording,
  toggleRecording,
  totalTime,
});

export default Recording;
