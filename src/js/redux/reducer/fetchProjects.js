/* eslint-disable new-cap */

import store from '../store';
import { pipe, prop } from 'ramda';
import { RemoteData, Validation, typeCheckers } from '../../types';
import { fetchRecording } from '../actions';

function parseProject(obj) {
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

export default (state, _) => {
  const request = fetch(state.serverURL)
  .then(r => r.json())
  .then(prop('projects'))
  .then(pipe(parseProject, RemoteData.Success, fetchRecording, store.dispatch))
  .catch(pipe(RemoteData.Failure, fetchRecording, store.dispatch));

  return RemoteData.Loading(request);
};
