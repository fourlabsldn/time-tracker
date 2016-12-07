import { propOr } from 'ramda';
import { object, string, nullable } from './type-checkers';
import { immutableConstructor } from './utils';
import Recording from './Recording';

// ========================================================================
//
//     ALL GETTERS AND SETTERS (PUBLIC OR NOT) MUST BE IN THIS FILE
//
// ========================================================================

export const typeCheck = object({
  name: string,
  url: string,
  recording: nullable(Recording.typeCheck),
});

const Deliverable = immutableConstructor(typeCheck);

export const getRecording = propOr(null, 'recording');
export const getName = propOr(null, 'name');
export const getUrl = propOr(null, 'url');

Object.assign(Deliverable, {
  typeCheck,
  getRecording,
  getName,
  getUrl,
});
export default Deliverable;
