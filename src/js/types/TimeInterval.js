/* eslint-disable no-nested-ternary */
import { immutableConstructor } from './utils';
import { date, object } from './type-checkers';
import Maybe from './Maybe';
import { pipe } from 'ramda';
// ========================================================================
//
//     ALL GETTERS AND SETTERS (PUBLIC OR NOT) MUST BE IN THIS FILE
//
// ========================================================================

export const typeCheck = object({
  start: date,
  end: date,
});

// CONSTRUCTOR
const TimeInterval = immutableConstructor(typeCheck);

// PRIVATE GETTERS
export const getStart = model => (
  !model ? null
    : model.start instanceof Date ? model.start
    : null
);

export const getEnd = model => (
  !model ? null
    : model.end instanceof Date ? model.end
    : null
);
// GETTERS
// Returns the time difference betweet start and end in milliseconds
export const getValue = (model) => {
  const maybeStart = pipe(
    Maybe.of,
    Maybe.map(getStart),
    Maybe.map(v => v.valueOf())
  )(model);

  const maybeEnd = pipe(
    Maybe.of,
    Maybe.map(getEnd),
    Maybe.map(v => v.valueOf())
  )(model);
  return pipe(
    Maybe.map2((s, e) => e - s),
    Maybe.withDefault(null)
  )(maybeStart, maybeEnd);
};

Object.assign(TimeInterval, {
  typeCheck,
  getStart,
  getEnd,
  getValue,
});

export default TimeInterval;
