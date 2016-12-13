import { allProjects, updateProject, recordingsInfo } from './utils';
import { Project, Recording, Deliverable, Maybe } from '../../types';
import { curry, find, pipe, filter, prop, head } from 'ramda';

// Model -> {Project, Deliverable} -> Model
const toggleDeliverableRecording = curry((model, { project, deliverable }) =>
  Maybe.of(deliverable)
    .map(Deliverable.getRecording)
    .map(Recording.toggleRecording)
    .map(Deliverable.setRecording(deliverable))
    .map(Project.updateDeliverable(project))
    .map(updateProject(project, model))
    .withDefault(model)
);

// Model -> Maybe
const findRecordingDeliverable = model =>
  Maybe.of(model)
    .map(recordingsInfo)
    .map(filter(pipe(prop('recording'), Recording.isRecording)))
    .map(head);

// Model -> Model
const stopAllRecordings = model =>
  Maybe.of(model)
    .map(m => console.log('stopping all recordings for', model) || m)
    .chain(findRecordingDeliverable)
    .map(toggleDeliverableRecording(model))
    .map(stopAllRecordings)
    .withDefault(model);

// Project -> Maybe(Project)
const getUpToDateProject = curry((project, model) =>
  Maybe.of(model)
    .map(allProjects)
    .map(find(Project.isSame(project)))
);

export default (model, { project, deliverable }) =>
  Maybe.of(model)
    .map(stopAllRecordings)
    .chain(changedModel =>
      getUpToDateProject(project, changedModel)
      .map(p =>
        toggleDeliverableRecording(
          changedModel,
          { project: p, deliverable }
        ))
    )
    .withDefault(model);
