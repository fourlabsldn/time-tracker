/* eslint-env jasmine */
/* eslint-disable new-cap, no-underscore-dangle */
import { pipe } from 'ramda';
import {
  Recording,
  Validation,
  TimeInterval,
} from '../../js/types';


describe('Recording type', () => {
  const now = Date.now();

  const secInterval5 = TimeInterval.of({
    start: new Date(now - 100 * 1000),
    end: new Date(now - 95 * 1000),
  });
  const secInterval10 = TimeInterval.of({
    start: new Date(now - 200 * 1000),
    end: new Date(now - 190 * 1000),
  });

  const valid1 = { startTime: null, intervals: [] };
  const valid1Running = { startTime: new Date(), intervals: [] };
  const valid2 = { startTime: null, intervals: [
    secInterval5,
    secInterval10,
  ] };
  const valid2Running = { startTime: new Date(), intervals: [
    secInterval5,
    secInterval10,
  ] };

  it('type checks correctly', () => {
    const invalid1 = {};
    const invalid1Running = { startTime: 'adsf', intervals: [] };
    const invalid2 = { startTime: 'adsf', intervals: null };
    const validates = pipe(Recording.typeCheck, Validation.isSuccess);

    expect(validates(invalid1)).toBe(false);
    expect(validates(invalid1Running)).toBe(false);
    expect(validates(invalid2)).toBe(false);

    expect(validates(valid1)).toBe(true);
    expect(validates(valid1Running)).toBe(true);
    expect(validates(valid2)).toBe(true);
    expect(validates(valid2Running)).toBe(true);
  });

  it('returns the startTime and does not break with null', () => {
    const date = new Date();
    expect(Recording.getStartTime({ startTime: date })).toEqual(date);
    expect(Recording.getStartTime({ startTime: null })).toEqual(null);
    expect(Recording.getStartTime({})).toEqual(null);
    expect(_ => Recording.getStartTime(null)).not.toThrow();
  });

  it('always returns an array for getIntervals', () => {
    const intervals = [secInterval10, secInterval5];
    const intervalIsArray = pipe(Recording.getIntervals, v => Array.isArray(v));

    expect(intervalIsArray({ intervals })).toEqual(true);
    expect(intervalIsArray({ intervals: null })).toEqual(true);
    expect(intervalIsArray({})).toEqual(true);
    expect(_ => Recording.getIntervals(null)).not.toThrow();
  });

  it('sets the interval without throwing with null', () => {
    expect(_ => Recording.setIntervals(null, null)).not.toThrow();
    expect(_ => Recording.setIntervals(null, [])).not.toThrow();
    expect(_ => Recording.setIntervals({ intervals: [] }, null)).not.toThrow();
    expect(_ => Recording.setIntervals({ intervals: [] }, undefined)).not.toThrow();
    expect(_ => Recording.setIntervals({ intervals: [] }, 'asfadsf')).not.toThrow();
    expect(_ => Recording.setIntervals('asasdf', 'asfadsf')).not.toThrow();
    expect(_ => Recording.setIntervals('asasdf', [])).not.toThrow();
  });

  it('setIntervals works', () => {
    const empty = [];
    const intervals = [secInterval10, secInterval5];
    const setAndGetIntervals = pipe(Recording.setIntervals, Recording.getIntervals);
    expect(setAndGetIntervals({ intervals: [] }, intervals)).toEqual(intervals);
    expect(setAndGetIntervals({ intervals }, empty)).toEqual(empty);
    expect(setAndGetIntervals({}, empty)).toEqual(empty);
  });

  it('says whether isRecording or not', () => {
    expect(Recording.isRecording(valid1Running)).toEqual(true);
    expect(Recording.isRecording(valid2)).toEqual(false);
    expect(_ => Recording.isRecording(null)).not.toThrow();
  });

  it('sets the correct startTime in toggleRecording', () => {
    const toggledValue = pipe(Recording.toggleRecording, Recording.isRecording);
    const toggledStartTime = pipe(Recording.toggleRecording, Recording.getStartTime);
    expect(toggledValue(valid1Running)).toEqual(false);
    expect(toggledValue(valid1)).toEqual(true);
    expect(toggledValue(null)).toEqual(false);
    expect(toggledStartTime(valid1Running)).toBe(null);
    expect(toggledStartTime(valid2).valueOf()).toBeLessThanOrEqual(new Date().valueOf());
  });

  it('calculates the total time correctly', () => {
    const sec15 = { startTime: null, intervals: [secInterval10, secInterval5] };
    const sec15Running = { startTime: new Date(), intervals: [secInterval10, secInterval5] };
    const sec0 = { startTime: null, intervals: [] };
    const sec0Running = { startTime: new Date(), intervals: [] };

    expect(Recording.totalTime(sec15)).toEqual(1000 * 15);
    expect(Recording.totalTime(sec0)).toEqual(0);
    expect(Recording.totalTime(sec15Running)).toBeGreaterThan(100 * 15);
    expect(Recording.totalTime(sec0Running)).toBeGreaterThan(0);
  });
});
