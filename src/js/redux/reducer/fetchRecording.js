/* eslint-disable new-cap */

import store from '../store';
import { pipe, prop } from 'ramda';
import { RemoteData } from '../../types';
import { fetchRecordingStatusChange } from '../actions';

export default (state, _) => {
  const request = fetch(state.serverURL)
  .then(r => r.json())
  .then(prop('recording'))
  .then(pipe(RemoteData.Success, fetchRecordingStatusChange, store.dispatch))
  .catch(pipe(RemoteData.Failure, fetchRecordingStatusChange, store.dispatch));

  return Object.assign({}, state, { recording: RemoteData.Loading(request) });
};
