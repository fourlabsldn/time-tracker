import { Maybe, RemoteData } from '../types';

// ===================================================================
//  Initial
// ===================================================================

export const initialState = {
  recording: Maybe.Nothing(),
  serverURL: './data.json',
  availableProjects: RemoteData.NotAsked(),
};
