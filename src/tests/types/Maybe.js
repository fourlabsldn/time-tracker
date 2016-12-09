/* eslint-disable new-cap */
/* eslint-env jasmine */

import { pipe } from 'ramda';
import { Maybe } from '../../js/types';


describe('Maybe type', () => {
  const createdJustWithOf = pipe(Maybe.of, Maybe.isJust);
  const createdJust = pipe(Maybe.Just, Maybe.isJust);
  const createdNothing = pipe(Maybe.Nothing, Maybe.isNothing);
  const defaultVal = 'default';
  const justVal = 'asfd';

  it('creates a Just when passed truthy and falsy non-null values', () => {
    expect(createdJust('1')).toBe(true);
    expect(createdJust({})).toBe(true);
    expect(createdJust(true)).toBe(true);
    expect(createdJust(false)).toBe(true);
    expect(createdJust([])).toBe(true);
  });

  it('creates a Nothing when passed anything with the Nothing constructor', () => {
    expect(createdNothing('1')).toBe(true);
    expect(createdNothing({})).toBe(true);
    expect(createdNothing(true)).toBe(true);
    expect(createdNothing(false)).toBe(true);
    expect(createdNothing([])).toBe(true);
    expect(createdNothing(null)).toBe(true);
    expect(createdNothing()).toBe(true);
  });

  it('creates a Nothing if null or undefined is passed to the general constructor', () => {
    expect(createdJustWithOf(null)).toBe(false);
    expect(createdJustWithOf()).toBe(false);
  });

  it('creates a Just if something is passed to the general constructor', () => {
    expect(createdJustWithOf('1')).toBe(true);
    expect(createdJustWithOf({})).toBe(true);
    expect(createdJustWithOf(true)).toBe(true);
    expect(createdJustWithOf(false)).toBe(true);
    expect(createdJustWithOf([])).toBe(true);
  });

  it('Retuns default only to Nothing values', () => {
    expect(Maybe.withDefault(defaultVal, Maybe.Just(justVal))).toEqual(justVal);
    expect(Maybe.withDefault(defaultVal, Maybe.Nothing(justVal))).toEqual(defaultVal);
  });

  it('maps Just only values', () => {
    const mappedVal = 'mapped';
    const func = _ => mappedVal;
    const mapAndGetDefault = pipe(Maybe.map(func), Maybe.withDefault(defaultVal));
    expect(mapAndGetDefault(Maybe.Just(justVal))).toEqual(mappedVal);
    expect(mapAndGetDefault(Maybe.Nothing(justVal))).toEqual(defaultVal);
  });

  it('maps only two Justs in map2', () => {
    const mappedVal = 'mapped';
    const func = _ => mappedVal;
    const map2AndGetDefault = pipe(Maybe.map2(func), Maybe.withDefault(defaultVal));
    expect(map2AndGetDefault(Maybe.Just(justVal), Maybe.Just(justVal))).toEqual(mappedVal);
    expect(map2AndGetDefault(Maybe.Just(justVal), Maybe.Nothing(justVal))).toEqual(defaultVal);
    expect(map2AndGetDefault(Maybe.Nothing(justVal), Maybe.Just(justVal))).toEqual(defaultVal);
    expect(map2AndGetDefault(Maybe.Nothing(justVal), Maybe.Nothing(justVal))).toEqual(defaultVal);
  });

  it('has curried maps', () => {
    const mappedVal = 'mapped';
    expect(
      Maybe.withDefault(
        defaultVal,
        Maybe.map(_ => mappedVal)(Maybe.Just('j'))
      )
    ).toEqual(mappedVal);
  });
});
