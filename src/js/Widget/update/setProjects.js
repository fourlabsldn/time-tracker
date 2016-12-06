import { isRecording, updateAt } from './utils';
import { pipe } from 'ramda';
import assert from 'fl-assert';

export default (model, action) => {
  assert(!isRecording(model), 'Trying to update project array whilst recording');

  const newProjects = action.rawProjects;
  return pipe(
    updateAt(['unselectedProjects'], newProjects),
    updateAt(['selectedProject'], null),
  )(model);
};
