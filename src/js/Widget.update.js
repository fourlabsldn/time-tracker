import assert from 'fl-assert';
import { Project, Recording, TimeInterval, State } from './types';
import { not, equals, propEq, curry, prop } from 'ramda';

export const startStopRecording = curry((state, time, shouldStart) => {
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

export const selectProject = curry((state, projectName) => {
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

export const selectDeliverable = curry((state, deliverableName) => {
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


/**
 * Sets an array of projects as the new available projects in the widget.
 * @method setProjects
 * @param {Object} state
 * @param {Array<Object>} projects
 */
export const setProjects = curry((state, projects) => {
  assert(Array.isArray(projects), `Invalid array of projects: ${JSON.stringify(projects)}`);

  // TODO: We must use IDS instead of names, as names can change.
  const currentlyRecordingProject = state.recording
    ? state.recording.project
    : null;

  assert(
    !(currentlyRecordingProject
      && !projects
        .map(prop('name'))
        .includes(currentlyRecordingProject.name)
    ),
    'Currently recording project is not present in new projects array.'
  );

  const { recording, serverURL } = state;

  return currentlyRecordingProject
    ? new State({
      recording,
      serverURL,
      availableProjects: projects.filter(p => p.name !== currentlyRecordingProject.name),
    })
    : new State({
      recording: null,
      serverURL,
      availableProjects: projects,
    });
});
