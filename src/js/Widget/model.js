import {
  typeCheckers,
} from '../types';
const {
  string,
  object,
  array,
  nullable,
  bool,
  date,
} = typeCheckers;

export const timeIntervalType = object({
  start: date,
  end: date,
});

const recordingType = object({
  startTime: nullable(date),
  intervals: array(timeIntervalType),
});

const deliverableType = object({
  name: string,
  url: string,
  recording: nullable(recordingType),
});

const projectType = object({
  name: string,
  url: string,
  unselectedDeliverables: array(deliverableType),
  selectedDeliverable: nullable(deliverableType),
});

const modelType = object({
  minimised: bool,
  serverURL: string,
  unselectedProjects: nullable(array(projectType)),
  selectedProject: projectType,
});

export default modelType;
