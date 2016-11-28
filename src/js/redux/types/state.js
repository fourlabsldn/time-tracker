import assert from 'fl-assert';
import RemoteData from './RemoteData';
import Maybe from 'data.maybe';
// ===================================================================
//  State Types
// ===================================================================

const Deliverabble = {
  name: string,
  url: string,
}
const deliverable = object(Deliverable);

const Project = {
  name: string,
  url: string,
  deliverables: array(deliverable),
  selectedDeliverable: deliverable,
}
const project = object(Deliverable);

const TimeInterval = {
  start: date,
  end: date,
}
const timeInterval = object(TimeInterval);

const Recording = {
  project : project,
  startTime: maybe(date),
  intervals: array(timeInterval),
}
const recording = object(recording);

const State = {
  recording: maybe(recording),
  serverURL: string,
}
const state = object(state);

// ===================================================================
//  Initial
// ===================================================================

export const initialState = {
  recording: Maybe.Nothing(),
  serverURL: string,
}

export const typeCheck = state;


/**
 * Checks that all types in the state are correct.
 * @method stateChecker
 * @param  {[type]} state [description]
 * @return {[type]} [description]
 */
export stateChecker = state => {
  assert(typeof state.name)

}
