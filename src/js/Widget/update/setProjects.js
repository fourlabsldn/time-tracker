import { isRecording, updateAt } from './utils';
import { pipe, map } from 'ramda';
import assert from 'fl-assert';

const processRawDeliverables = map(
    ({ name, url }) => ({
      name,
      url,
      recording: null,
    })
);

const processRawProjects = map(
  ({ name, url, deliverables }) => ({
    name,
    url,
    unselectedDeliverables: processRawDeliverables(deliverables),
    selectedDeliverable: null,
  })
);

export default (model, action) => {
  assert(!isRecording(model), 'Trying to update project array whilst recording');

  const newProjects = processRawProjects(action.rawProjects);
  return pipe(
    updateAt(['unselectedProjects'], newProjects),
    updateAt(['selectedProject'], null),
  )(model);
};
