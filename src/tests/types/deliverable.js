/* eslint-env jasmine */
/* eslint-disable new-cap, no-underscore-dangle */
import { pipe } from 'ramda';
import {
  Deliverable,
  Recording,
  Validation,
} from '../../js/types';

describe('Deliverable type', () => {
  const delivName = 'name';
  const delivUrl = 'url';
  const delivRec = Recording.of({ startTime: null, intervals: [] });
  const validObject = { name: delivName, url: delivUrl, recording: delivRec };
  const validDeliv = Deliverable.of(validObject);
  const validObjectNoRec = { name: delivName, url: delivUrl, recording: null };
  const validDelivNoRec = Deliverable.of(validObjectNoRec);

  it('type checks correctly', () => {
    const invalid1 = { name: 'asfd', url: 'adsf', recording: 'asdfa' };
    const invalid2 = { name: null, url: 'adsf', recording: null };
    const invalid3 = { name: 'asdf', url: null, recording: null };

    expect(Validation.isSuccess(Deliverable.typeCheck(invalid1))).toEqual(false);
    expect(Validation.isSuccess(Deliverable.typeCheck(invalid2))).toEqual(false);
    expect(Validation.isSuccess(Deliverable.typeCheck(invalid3))).toEqual(false);
    expect(Validation.isSuccess(Deliverable.typeCheck(validObject))).toEqual(true);
    expect(Validation.isSuccess(Deliverable.typeCheck(validObjectNoRec))).toEqual(true);
  });

  it('retuns a recording even if the Deliverable doesn\'t have one yet', () => {
    expect(
      pipe(
        Deliverable.getRecording,
        Recording.typeCheck,
        Validation.isSuccess
      )({})
    ).toEqual(true);
    expect(Deliverable.getRecording(null)).toEqual(null);
    expect(Deliverable.getRecording(undefined)).toEqual(null);
    expect(Deliverable.getRecording({ recording: delivRec })).toEqual(delivRec);
  });

  it('returns name and doesn\'t throw with null', () => {
    expect(Deliverable.getName(validDeliv)).toEqual(delivName);
    expect(_ => Deliverable.getName(null)).not.toThrow();
  });

  it('returns url and doesn\'t throw with null', () => {
    expect(Deliverable.getUrl(validDeliv)).toEqual(delivUrl);
    expect(_ => Deliverable.getUrl(null)).not.toThrow();
  });

  it('returns an object with the correct recording when using setRecording', () => {
    const setAndGetRecording = pipe(Deliverable.setRecording, Deliverable.getRecording);

    expect(setAndGetRecording(validDelivNoRec, delivRec)).toEqual(delivRec);
    expect(setAndGetRecording(null, validDeliv)).toEqual(null);
    expect(_ => setAndGetRecording(null, null)).not.toThrow();
  });
});
