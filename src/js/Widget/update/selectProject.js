import { propEq, propOr, reject, pipe } from 'ramda';
import {
  allProjects,
  updateAt,
} from './utils';

export default (model, action) => {
  const { project = null } = action;

  const projectName = propOr(null, 'name', project);
  const newUnselectedProjects = pipe(
    allProjects,
    reject(propEq('name', projectName))
  )(model);

  return pipe(
    updateAt(['selectedProject'], project),
    updateAt(['unselectedProjects'], newUnselectedProjects)
  )(model);
};
