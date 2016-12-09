/* eslint-disable new-cap, no-nested-ternary */
import { immutableConstructor } from '../utils';
import TimeInterval from '../TimeInterval';
import { nullable, array, date, object } from '../type-checkers';
import { isNil, propOr, pipe, curry } from 'ramda';
import _toggleRecording from './toggleRecording';
import _totalTime from './totalTime';
import Immutable from 'seamless-immutable';

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
const Recording = immutableConstructor(
  typeCheck,
  r => ({
    startTime: r && r.startTime ? r.startTime : null,
    intervals: r && r.intervals ? r.intervals : [],
  })
);

// PRIVATE GETTERS
export const getStartTime = propOr(null, 'startTime');
export const getIntervals = model => (
  isNil(model) ? []
  : isNil(model.intervals) ? []
  : model.intervals
);

// PRIVATE SETTERS
export const setStartTime = curry((model, v) => {
  const imutableModel = Immutable(model);
  return !!imutableModel && !!imutableModel.merge
    ? imutableModel.merge({ startTime: v }, { deep: true })
    : null;
});

export const setIntervals = curry((model, v) => {
  const imutableModel = Immutable(model);
  return !!imutableModel && !!imutableModel.merge
    ? imutableModel.merge({ intervals: v }, { deep: true })
    : null;
});
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
