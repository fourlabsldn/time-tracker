/* eslint-disable new-cap */
import { Maybe, RemoteData } from '../types';
import { pipe, curry } from 'ramda';

const defaultSubSerialiser = { serialise: v => v, deserialise: v => v };

export const maybe = {
  serialise: curry(
    (subSerialiser = defaultSubSerialiser, maybeVal) => ({
      type: Maybe.isSuccess(maybeVal) ? 'Success' : 'Failure',
      value: pipe(
          Maybe.map(subSerialiser.serialise),
          Maybe.withDefault(null),
        )(maybeVal),
    })),

  deserialise: curry(
    (subSerialiser = defaultSubSerialiser, { type, value }) => (
      type === 'Success'
        ? Maybe.Just(subSerialiser.deserialise(value))
        : Maybe.Nothing()
  )),
};

export const remoteData = {
  serialise: curry(
    (subSerialiser = defaultSubSerialiser, remote) => ({
      type: RemoteData.isSuccess(remote) ? 'Success' : 'NotAsked',
      value: pipe(
          RemoteData.mapSuccess(subSerialiser.serialise),
          RemoteData.toMaybe,
          Maybe.withDefault(null)
        )(remote),
    })),

  deserialise: curry(
    (subSerialiser = defaultSubSerialiser, { type, value }) => (
      type === 'Success'
        ? RemoteData.Success(subSerialiser.deserialise(value))
        : RemoteData.NotAsked()
  )),
};
