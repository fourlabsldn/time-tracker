import { propEq, not, pipe } from 'ramda';
import {
  allProjects,
  updateAt,
} from './utils';

export default (model, action) => {
  const newSelectedProject = allProjects(model)
    .find(
      propEq('name', action.projectName)
    );
  const newUnselectedProjects = allProjects(model)
    .filter(pipe(
        propEq('name', action.projectName),
        not
    ));

  return pipe(
    updateAt(['selectedProject'], newSelectedProject),
    updateAt(['unselectedProjects'], newUnselectedProjects)
  )(model);
};
