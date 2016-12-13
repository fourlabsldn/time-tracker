import { Project, Maybe } from '../../types';
import { updateProject } from './utils';

export default (model, { project, deliverable }) =>
  Maybe.map2(
    Project.setSelectedDeliverable,
    Maybe.of(project),
    Maybe.of(deliverable)
  )
  .map(v => console.log(v) || v)
  .map(updateProject(project, model))
  .withDefault(model);
