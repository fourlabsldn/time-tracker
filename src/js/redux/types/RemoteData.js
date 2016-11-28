/* eslint-disable new-cap*/
/**

  This type takes care of data that is fetched from the server.
  type RemoteData
    = NotAsked null
    | Loading Request
    | Failure Response
    | Success Response

 */
import { request, response } from './type-checkers';

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
      ? RemoteData(f(value), type)
      : RemoteData(f(value), type)
    ),
  };
}

export default {
  NotAsked: _ => RemoteData(null, types.NotAsked),
  Loading: v => RemoteData(v, types.Loading),
  Failure: v => RemoteData(v, types.Failure),
  Success: v => RemoteData(v, types.Success),
};
