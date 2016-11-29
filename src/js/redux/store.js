/* eslint-disable new-cap */
import { createStore } from 'redux';
import reducer from './reducer';
import { Maybe, RemoteData } from '../types';

// ===================================================================
//  Initial
// ===================================================================

export const initialState = {
  recording: Maybe.Nothing(),
  serverURL: './data.json',
  availableProjects: RemoteData.NotAsked(),
};

const store = createStore(reducer, initialState);
export default store;
