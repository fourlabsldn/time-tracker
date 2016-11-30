/**

  This type takes care of data that is fetched from the server.
  type RemoteData
    = NotAsked null
    | Loading Request
    | Failure Response
    | Success Response

 */
import { curry } from 'ramda';
import Maybe from './Maybe';

const types = {
  NotAsked: Math.random(),
  Loading: Math.random(),
  Failure: Math.random(),
  Success: Math.random(),
};

const mapIf = curry((condition, value, f) => (condition ? f(value) : value));

// =========================================
// INSTANCE FUNCTIONS
// =========================================
function RemoteData(value, type) {
  const isSuccess = type === types.Success;
  const isFailure = type === types.Failure;
  const isLoading = type === types.Loading;
  if (isFailure) {
    console.log('Failing with reason:', value);
  }

  this.isSuccess = isSuccess;
  this.isFailure = isFailure;
  this.isLoading = isLoading;
  this.isNotAsked = type === types.NotAsked;
  this.withDefault = elseVal => (isSuccess ? value : elseVal);
  this.map = f => new RemoteData(mapIf(isSuccess, value, f), type);
  this.mapSuccess = f => new RemoteData(mapIf(isSuccess, value, f), type);
  this.mapLoading = f => new RemoteData(mapIf(isLoading, value, f), type);
  this.mapFailure = f => new RemoteData(mapIf(isFailure, value, f), type);
  this.toMaybe = _ => (isSuccess ? Maybe.Just(value) : Maybe.Nothing()); // eslint-disable-line max-len, new-cap
  this._value = value; // JUST FOR DEBUGGING PURPOSES. DO NOT USE
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
RemoteData.toMaybe = v => v.toMaybe();

export default RemoteData;
