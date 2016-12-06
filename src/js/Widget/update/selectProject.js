import { propEq, not, pipe } from 'ramda';
import assert from 'fl-assert';
import {
  isRecording,
  allProjects,
  updateAt,
} from './utils';

export default (model, action) => {
  if (isRecording(model)) {
    return model;
  }

  const newSelectedProject = allProjects(model)
    .find(
      propEq('name', action.projectName)
    );
  const newUnselectedProjects = allProjects(model)
    .filter(pipe(
        propEq('name', action.projectName),
        not
    ));

  assert(newSelectedProject, `No projects found with name ${action.projectName}`);
  return pipe(
    updateAt(['selectedProject'], newSelectedProject),
    updateAt(['unselectedProjects'], newUnselectedProjects)
  )(model);
};
