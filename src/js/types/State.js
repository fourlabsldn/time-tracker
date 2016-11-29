/* eslint-disable new-cap */
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

export const State = {
  recording: maybe(recording),
  serverURL: string,
  availableProjects: remoteData,
};
export const stateTypeCheck = object(State);