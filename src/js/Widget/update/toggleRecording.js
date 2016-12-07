import { updateProject } from './utils';
import { Project, Recording, Deliverable } from '../../types';
import { pipe } from 'ramda';

export default (model, action) => {
  const { project, deliverable } = action;

  return pipe(
    Deliverable.getRecording,
    Recording.toggleRecording,
    Deliverable.setRecording(deliverable),
    Project.updateDeliverable(project),
    updateProject(project, model),
  )(deliverable);
};
