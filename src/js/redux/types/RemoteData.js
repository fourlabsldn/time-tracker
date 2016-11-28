/* eslint-disable new-cap*/
const types = {
  NotAsked: 'NotAsked',
  Loading: 'Loading',
  Failure: 'Failure',
  Success: 'Success',
};

function RemoteData(value, type) {
  return {
    isNotAsked: () => type === types.NotAsked,
    isLoading: () => type === types.Loading,
    isFailure: () => type === types.Failure,
    isSuccess: () => type === types.Success,
    getOrElse: elseVal => (type === types.Success ? value : elseVal),
    map: f => (type === types.Success
      ? RemoteData(f(value), type)
      : RemoteData(f(value), type)
    ),
  };
}

export default {
  NotAsked: v => RemoteData(v, types.NotAsked),
  Loading: v => RemoteData(v, types.Loading),
  Failure: v => RemoteData(v, types.Failure),
  Success: v => RemoteData(v, types.Success),
};
