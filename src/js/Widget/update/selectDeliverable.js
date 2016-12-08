import { Project } from '../../types';
import { pipe } from 'ramda';
import { updateProject } from './utils';

export default (model, action) => {
  const { project, deliverable } = action;

  return !project
    ? model
    : pipe(
      Project.setSelectedDeliverable(project),
      updateProject(project, model)
    )(deliverable);
};
