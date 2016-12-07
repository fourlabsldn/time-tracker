import { updateAt } from './utils';
import { pipe, map } from 'ramda';

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
  const newProjects = processRawProjects(action.rawProjects);
  return pipe(
    updateAt(['unselectedProjects'], newProjects),
    updateAt(['selectedProject'], null),
  )(model);
};
