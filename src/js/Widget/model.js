import {
  typeCheckers,
  Project,
} from '../types';
const {
  string,
  object,
  array,
  nullable,
  bool,
} = typeCheckers;

const modelType = object({
  minimised: bool,
  serverURL: string,
  unselectedProjects: nullable(array(Project.typeCheck)),
  selectedProject: nullable(Project.typeCheck),
});

export default modelType;
