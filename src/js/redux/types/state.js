/* eslint-disable new-cap */
import RemoteData from './RemoteData';
import Maybe from 'data.maybe';
import { string, object, date, remoteData, maybe, array } from './type-checkers';
// ===================================================================
//  State Types
// ===================================================================

const Deliverable = {
  name: string,
  url: string,
};
const deliverable = object(Deliverable);

const Project = {
  name: string,
  url: string,
  deliverables: array(deliverable),
  selectedDeliverable: deliverable,
};
const project = object(Project);

const TimeInterval = {
  start: date,
  end: date,
};
const timeInterval = object(TimeInterval);

const Recording = {
  project,
  startTime: maybe(date),
  intervals: array(timeInterval),
};
const recording = object(Recording);

const State = {
  recording: maybe(recording),
  serverURL: string,
  availableProjects: remoteData,
};
const state = object(State);

// ===================================================================
//  Initial
// ===================================================================

export const initialState = {
  recording: Maybe.Nothing(),
  serverURL: './data.json',
  availableProjects: RemoteData.NotAsked(),
};

export const stateTypeCheck = state;
