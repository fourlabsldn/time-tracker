/* eslint-disable new-cap */
import { propOr, curry, isNil } from 'ramda';
import { object, string, nullable } from './type-checkers';
import { immutableConstructor } from './utils';
import Recording from './Recording';
import Immutable from 'seamless-immutable';

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

export const getRecording = deliverable => (
  deliverable
    ? deliverable.recording || Recording.of({})
    : null
);

export const getName = propOr(null, 'name');
export const getUrl = propOr(null, 'url');

// Deliverable -> Recording -> Deliverable
export const setRecording = curry((model, newRecording) => (
  isNil(model)
    ? null
    : Immutable(model).merge({ recording: newRecording }, { deep: true })
));

Object.assign(Deliverable, {
  typeCheck,
  getRecording,
  getName,
  getUrl,
  setRecording,
});
export default Deliverable;
