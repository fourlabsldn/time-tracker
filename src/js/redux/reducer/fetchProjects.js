/* eslint-disable new-cap */

import store from '../store';
import { pipe, prop, map } from 'ramda';
import { RemoteData, Validation, typeCheckers } from '../../types';
import { fetchProjectsStatusChange } from '../actions';

function parseSingleProject(obj) {
  const allDeliverables = obj.deliverables.map(dObj => ({
    name: dObj.name,
    url: dObj.url,
  }));

  const project = {
    name: obj.name,
    url: obj.url,
    selectedDeliverable: allDeliverables[0],
    deliverables: allDeliverables.slice(1),
  };

  Validation.throwFailure(typeCheckers.project(project));
  return project;
}

const parseProjects = map(parseSingleProject);

export default (state, _) => {
  const request = fetch(state.serverURL)
  .then(r => r.json())
  .then(prop('projects'))
  .then(pipe(parseProjects, RemoteData.Success, fetchProjectsStatusChange, store.dispatch))
  .catch(pipe(RemoteData.Failure, fetchProjectsStatusChange, store.dispatch));

  return Object.assign({}, state, { availableProjects: RemoteData.Loading(request) });
};
