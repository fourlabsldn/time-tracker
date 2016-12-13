import { Project, Maybe } from '../../types';
import { updateProject } from './utils';
import selectProject from './selectProject';

export default (model, { project, deliverable }) =>
  Maybe.of(project)
    .map(p => selectProject(model, { project: p }))
    .chain(m =>
      Maybe.of(m.selectedProject)
        .chain(p =>
          Maybe.of(deliverable)
          .map(Project.setSelectedDeliverable(p))
          .map(updateProject(p, m))
        )
  )
  .withDefault(model);
