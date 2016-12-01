import assert from 'fl-assert';
import { string, object, date, array, nullable } from './type-checkers';

// ===================================================================
//  State Types
// ===================================================================



const deliverable = object({ name: string, url: string });
export function Deliverable(name, url) {
  this.name = name;
  this.url = url;
  deliverable(this).throwFailure();
}

const project = object({
  name: string,
  url: string,
  deliverables: array(deliverable),
  selectedDeliverable: nullable(deliverable),
});
// deliverables and selectedDeliverables together form a ziplist.
export function Project({ name, url, deliverables = [], selectedDeliverable = null }) {
  this.name = name;
  this.url = url;
  this.deliverables = deliverables;
  this.selectedDeliverable = selectedDeliverable;

  assert(
    !(deliverables.includes(selectedDeliverable)),
    'Selected deliverable cannot be repeated in deliverables list'
  );
  project(this).throwFailure();
}

const timeInterval = object({ start: date, end: date });
export function TimeInterval(start, end) {
  this.start = start;
  this.end = end;
  timeInterval(this).throwFailure();
}


export const recording = object({
  project,
  startTime: nullable(date),
  intervals: array(timeInterval),
});
export function Recording({ project, startTime = null, intervals = [] }) {
  this.project = project;
  this.startTime = startTime;
  this.intervals = intervals;
  recording(this).throwFailure();
}

const state = object({
  recording: nullable(recording),
  serverURL: string,
  availableProjects: nullable(array(project)),
});

export function State({ recording = null, serverURL, availableProjects = null }) {
  this.recording = recording;
  this.serverURL = serverURL;
  this.availableProjects = availableProjects;

  assert(
    !(recording && availableProjects && availableProjects.includes(recording.project)),
    'Recording project must not be included in availableProjects array'
  );

  state(this).throwFailure();
}
