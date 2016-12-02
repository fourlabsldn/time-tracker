import assert from 'fl-assert';
import { not, equals, propEq, curry, prop, pipe } from 'ramda';
import {
  Project,
  Recording,
  TimeInterval,
  Deliverable,
  State,
  Maybe,
} from './types';


export const startStopRecording = curry((state, time, shouldStart) => {
  const proj = Maybe.of(state).map()
  const deliv = Maybe.map(Project.getSelectedDeliverable, proj);
  const newRecording = pipe(
    Maybe.map(Deliverable.getRecording),
    Maybe.map(Recording.toggleRecording(time, shouldStart))
  )(deliv);

  Maybe.map2(newRecording, deliv, Deliverable.setRecording)
CONTINUE FROM HERE

}; {
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

  if (projectName === null) {
    return new State({
      recording: null,
      serverURL,
      availableProjects: allProjects,
    });
  }

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
    availableProjects: allProjects.filter(({ name }) => name !== chosenProject.name),
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

  assert(
    chosenDeliverable || deliverableName === null,
    `No deliverables found with name ${deliverableName}`
  );

  const newProject = deliverableName === null
    ? new Project({
      name: project.name,
      url: project.url,
      deliverables: allProjectDeliverables,
      selectedDeliverable: null,
    })
    : new Project({
      name: project.name,
      url: project.url,
      deliverables: allProjectDeliverables.filter(v => !equals(chosenDeliverable)(v)),
      selectedDeliverable: chosenDeliverable,
    });

  // TODO: This is just wrong. When you change deliverables you shouldn't
  // start everything from the beginning. It shouldpick up where you left off.
  const newRecording = new Recording({
    project: newProject,
    startTime: null,
    intervals: [],
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
export const setProjects = curry((state, rawProjects) => {
  assert(Array.isArray(rawProjects), `Invalid array of projects: ${JSON.stringify(rawProjects)}`);

  // TODO: We must use IDS instead of names, as names can change.
  const currentlyRecordingProject = state.recording
    ? state.recording.project
    : null;

  assert(
    !(currentlyRecordingProject
      && !rawProjects
        .map(prop('name'))
        .includes(currentlyRecordingProject.name)
    ),
    'Currently recording project is not present in new projects array.'
  );

  const { recording, serverURL } = state;

  const projects = rawProjects.map(p => new Project(p));
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

export const isRecording = pipe(
  Maybe.of,
  Maybe.map(State.getSelectedProject),
  Maybe.map(Project.getSelectedDeliverable),
  Maybe.map(Deliverable.isRecording),
  Maybe.withDefault(false)
);
