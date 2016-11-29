/**

  This type takes care of data that is fetched from the server.
  type RemoteData
    = NotAsked null
    | Loading Request
    | Failure Response
    | Success Response

 */
import { request, response } from './type-checkers';
import { curry } from 'ramda';

const types = {
  NotAsked: {
    name: Math.random(),
    checker: null,
  },
  Loading: {
    name: Math.random(),
    checker: request,
  },
  Failure: {
    name: Math.random(),
    checker: response,
  },
  Success: {
    name: Math.random(),
    checker: response,
  },
};

const mapIf = curry((condition, value, f) => (condition ? f(value) : value));

// =========================================
// INSTANCE FUNCTIONS
// =========================================
function RemoteData(value, type) {
  // Check that a valid type is being used
  type.checker(value).failureMap(err => { throw new Error(`RemoteData: ${err}`); });

  const isSuccess = type.name === types.Success.name;
  const isFailure = type.name === types.Failure.name;
  const isLoading = type.name === types.Loading.name;
  return {
    isSuccess,
    isFailure,
    isLoading,
    isNotAsked: type.name === types.NotAsked.name,
    withDefault: elseVal => (isSuccess ? value : elseVal),
    map: f => new RemoteData(mapIf(isSuccess, value, f), type),
    mapSuccess: f => new RemoteData(mapIf(isSuccess, value, f), type),
    mapLoading: f => new RemoteData(mapIf(isLoading, value, f), type),
    mapFailure: f => new RemoteData(mapIf(isFailure, value, f), type),
  };
}


// =========================================
// STATIC FUNCTIONS
// =========================================
RemoteData.NotAsked = _ => new RemoteData(null, types.NotAsked);
RemoteData.Loading = v => new RemoteData(v, types.Loading);
RemoteData.Failure = v => new RemoteData(v, types.Failure);
RemoteData.Success = v => new RemoteData(v, types.Success);

RemoteData.isNotAsked = v => v.isNotAsked;
RemoteData.isLoading = v => v.isLoading;
RemoteData.isFailure = v => v.isFailure;
RemoteData.isSuccess = v => v.isSuccess;
RemoteData.withDefault = curry((elseVal, v) => v.withDefault(elseVal));
RemoteData.map = curry((f, v) => v.map(f));
RemoteData.mapSuccess = curry((f, v) => v.mapSuccess(f));
RemoteData.mapLoading = curry((f, v) => v.mapLoading(f));
RemoteData.mapFailure = curry((f, v) => v.mapFailure(f));

export default RemoteData;
