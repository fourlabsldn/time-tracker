import { object, string, nullable } from './type-checkers';
import { immutableConstructor, checkType } from './utils';
import Recording from './Recording';
import { pipe, propOr, curry } from 'ramda';
import Immutable from 'seamless-immutable';
import Maybe from './Maybe';

export const typeCheck = object({
  name: string,
  url: string,
  recording: nullable(Recording.typeCheck),
});

export const Deliverable = immutableConstructor(typeCheck);

export const getRecording = propOr('recording', Recording.of({ startTime: null, intervals: [] }));

export const setRecording = curry((v, model) => pipe(
  Maybe.of,
  Maybe.map(Immutable.set(model, 'recording', v)),
  Maybe.map(checkType(typeCheck)),
  Maybe.withDefault(model)
)());


Object.assign(Deliverable, {
  typeCheck,
  getRecording,
  setRecording,
});

export default Deliverable;
