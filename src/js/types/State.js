import { object, string, nullable, array, boolean } from './type-checkers';
import { immutableConstructor, checkType } from './utils';
import Project from './Project';
import Immutable from 'seamless-immutable';
import { curry, prop, pipe, propOr } from 'ramda';

export const typeCheck = object({
  minimised: boolean,
  serverURL: string,
  availableProjects: nullable(array(Project.typeCheck)),
  selectedProject: Project.typeCheck,
});

const State = immutableConstructor(typeCheck);

export const getMinimised = prop('minimised');
export const getServerUrl = prop('serverUrl');
export const getSelectedProject = propOr('selectedProject', null);
export const getAvailableProjects = model => (
  getSelectedProject(model)
    ? [getSelectedProject(model), ... (model.availableProjects || [])]
    : (model.availableProjects || [])
  );

export const setMinimised = curry((v, model) => pipe(
  Immutable.set(model, 'minimised', v),
  checkType(typeCheck)
)());

export const setAvailableProjects = curry((model, availableProjects) =>
  Immutable.merge({ availableProjects }, model));

export const setSelectedProject = curry((model, newSelected) => {
  const all = getAvailableProjects(model);
  const newProjects = all.filter(
    d => Project.getName(d) !== Project.getName(newSelected)
  );

  return Immutable.merge({
    availableProjects: newProjects,
    selectedProject: newSelected,
  });
});


Object.assign(State, {
  typeCheck,
  getMinimised,
  setMinimised,
  getSelectedProject,
  setAvailableProjects,
  setSelectedProject,
});

export default State;
