/* eslint-env jasmine */
/* eslint-disable new-cap, no-underscore-dangle */
import { pipe } from 'ramda';
import {
  Validation,
  TimeInterval,
} from '../../js/types';

describe('TimeInterval type', () => {
  const now = Date.now();
  const validObj = { start: new Date(now), end: new Date(now + 5 * 1000) };

  it('checks for types correctly', () => {
    const invalid1 = {};
    const invalid2 = { start: new Date() };
    const invalid3 = { start: new Date(), end: '' };
    const invalid4 = { start: new Date, end: 123 };
    const invalid5 = { end: new Date };

    const validates = pipe(TimeInterval.typeCheck, Validation.isSuccess);
    expect(validates(invalid1)).toEqual(false);
    expect(validates(invalid2)).toEqual(false);
    expect(validates(invalid3)).toEqual(false);
    expect(validates(invalid4)).toEqual(false);
    expect(validates(invalid5)).toEqual(false);
  });

  it('returns start date without breaking with null', () => {
    expect(TimeInterval.getStart(validObj)).toEqual(validObj.start);
    expect(TimeInterval.getStart({})).toEqual(null);
    expect(TimeInterval.getStart(null)).toEqual(null);
    expect(TimeInterval.getStart(undefined)).toEqual(null);
  });

  it('returns end date without breaking with null', () => {
    expect(TimeInterval.getEnd(validObj)).toEqual(validObj.end);
    expect(TimeInterval.getEnd({})).toEqual(null);
    expect(TimeInterval.getEnd(null)).toEqual(null);
    expect(TimeInterval.getEnd(undefined)).toEqual(null);
  });

  it('calculates the date difference correctly', () => {
    expect(TimeInterval.getValue(validObj)).toEqual(5 * 1000);
  });

  it('returns null if an invalid TimeInterval object is provided in getValue', () => {
    expect(_ => TimeInterval.getValue(null)).not.toThrow();
    expect(TimeInterval.getValue(null)).toEqual(null);
    expect(TimeInterval.getValue(undefined)).toEqual(null);
    expect(TimeInterval.getValue({})).toEqual(null);
    expect(TimeInterval.getValue([])).toEqual(null);
  });
});
