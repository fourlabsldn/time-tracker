import { immutableConstructor } from '../utils';
import { prop } from 'ramda';
import { date, object } from '../type-checkers';
import moment from 'moment';

export const typeCheck = object({
  start: date,
  end: date,
});

// CONSTRUCTOR
const TimeInterval = immutableConstructor(typeCheck);

// GETTERS
// Returns the time difference betweet start and end in milliseconds
export const getValue = ({ end, start }) => moment(end).diff(moment(start));

// PRIVATE GETTERS
export const getStart = prop('start');
export const getEnd = prop('end');

export default TimeInterval;
