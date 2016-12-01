import assert from 'fl-assert';
import { Project, Recording, TimeInterval, State } from './types';
import { not, equals, propEq, curry } from 'ramda';

const startStopRecording = curry((state, time, shouldStart) {
  const projectChosen = !!state.recording;
  const recordingAlreadyStarted = projectChosen && !!state.recording.startTime;
  const shouldStop = !shouldStart;

  if (!projectChosen ||
      (shouldStop && !recordingAlreadyStarted) ||
      (shouldStart && recordingAlreadyStarted)
    ) {
    return state;
  }

  const { project, startTime, intervals } = state.recording;

  const newRecording = shouldStart
    ? new Recording({ project, startTime: time, intervals })
    : new Recording({
      project,
      startTime: null,
      intervals: [
        new TimeInterval(startTime, time),
        ...state.recording.intervals,
      ],
    });

  const { serverURL, availableProjects } = state;
  return new State({
    recording: newRecording,
    serverURL,
    availableProjects,
  });
});

const selectProject = curry((state, projectName) {
  const { recording, serverURL, availableProjects } = state;

  const isCurrentlyRecording = recording && recording.startTime;
  if (!availableProjects || isCurrentlyRecording) {
    return state;
  }

  const allProjects = recording && recording.project
    ? availableProjects.concat(recording.project)
    : availableProjects;

  const chosenProject = allProjects.find(propEq('name', projectName));

  assert(chosenProject, `No project found with name ${projectName}`);

  const newRecording = new Recording({
    project: chosenProject,
    startTime: null,
    intervals: [],
  });

  return new State({
    recording: newRecording,
    serverURL,
    availableProjects,
  });
});

const selectDeliverable = curry((state, deliverableName) {
  const { recording } = state;

  const projectChosen = !!recording;
  const isCurrentlyRecording = recording && recording.startTime;

  if (!projectChosen || isCurrentlyRecording) {
    return state;
  }

  const { project } = recording;

  const allProjectDeliverables = project.selectedDeliverable
    ? [project.selectedDeliverable, ...project.deliverables]
    : project.deliverables;

  const chosenDeliverable = allProjectDeliverables.find(propEq('name', deliverableName));

  assert(chosenDeliverable, `No deliverables found with name ${deliverableName}`);

  const newProject = new Project({
    name: project.name,
    url: project.url,
    deliverables: allProjectDeliverables.filter(not(equals(chosenDeliverable))),
    selectedDeliverable: chosenDeliverable,
  });

  // TODO: This is just wrong. When you change deliverables you shouldn't
  // start everything from the beginning. It shouldpick up where you left off.
  const newRecording = new Recording({
    project: newProject,
    startTime: null,
    intervals: null,
  });

  return new State({
    recording: newRecording,
    serverURL: state.serverURL,
    availableProjects: state.availableProjects,
  });
});

export startStopRecording;
export selectProject;
export selectDeliverable;
