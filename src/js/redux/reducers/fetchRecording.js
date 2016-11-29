/* eslint-disable new-cap */

import store from '../store';
import { pipe, prop } from 'ramda';
import { RemoteData } from '../../types';
import { fetchRecording } from '../actions';

export default (state, _) => {
  const request = fetch(state.serverURL)
  .then(r => r.json())
  .then(prop('recording'))
  .then(pipe(RemoteData.Success, fetchRecording, store.dispatch))
  .catch(pipe(RemoteData.Failure, fetchRecording, store.dispatch));

  return RemoteData.Loading(request);
};
