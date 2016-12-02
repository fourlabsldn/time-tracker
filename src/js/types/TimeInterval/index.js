import { immutableConstructor } from '../utils';
import { prop } from 'ramda';
import { date, object } from '../type-checkers';
import moment from 'moment';

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
export const getStart = prop('start');
export const getEnd = prop('end');

// GETTERS
// Returns the time difference betweet start and end in milliseconds
export const getValue = (model) =>
  moment(getEnd(model))
  .diff(moment(getStart(model)));


export default TimeInterval;
