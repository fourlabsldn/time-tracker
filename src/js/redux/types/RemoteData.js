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
    name: 'NotAsked',
    checker: null,
  },
  Loading: {
    name: 'Loading',
    checker: request,
  },
  Failure: {
    name: 'Failure',
    checker: response,
  },
  Success: {
    name: 'Success',
    checker: response,
  },
};

// =========================================
// INSTANCE FUNCTIONS
// =========================================
function RemoteData(value, type) {
  // Check that a valid type is being used
  type.checker(value).failureMap(err => { throw new Error(`RemoteData: ${err}`); });
  return {
    isNotAsked: () => type.name === types.NotAsked.name,
    isLoading: () => type.name === types.Loading.name,
    isFailure: () => type.name === types.Failure.name,
    isSuccess: () => type.name === types.Success.name,
    getOrElse: elseVal => (type === types.Success ? value : elseVal),
    map: f => (type === types.Success
      ? new RemoteData(f(value), type)
      : new RemoteData(value, type)
    ),
  };
}


// =========================================
// STATIC FUNCTIONS
// =========================================
RemoteData.NotAsked = _ => new RemoteData(null, types.NotAsked);
RemoteData.Loading = v => new RemoteData(v, types.Loading);
RemoteData.Failure = v => new RemoteData(v, types.Failure);
RemoteData.Success = v => new RemoteData(v, types.Success);

RemoteData.isNotAsked = v => v.isNotAsked();
RemoteData.isLoading = v => v.isLoading();
RemoteData.isFailure = v => v.isFailure();
RemoteData.isSuccess = v => v.isSuccess();
RemoteData.getOrElse = v => v.getOrElse();
RemoteData.map = curry((f, v) => v.map(f));

export default RemoteData;
