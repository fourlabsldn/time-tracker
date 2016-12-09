/* eslint-env jasmine */
/* eslint-disable new-cap, no-underscore-dangle */
import {
  Validation,
} from '../js/types';

describe('Validation type', () => {
  const successVal = 'success';
  const successVal2 = 'success2';
  const failureVal = 'failure';
  const aSuccess = Validation.Success(successVal);
  const aSuccess2 = Validation.Success(successVal2);
  const aFailure = Validation.Failure(failureVal);

  it('creates a success value with a truthy parameter', () => {
    const a = Validation.Success(123);
    expect(a.isSuccess).toBe(true);
    expect(Validation.isSuccess(a)).toBe(true);
  });

  it('creates a failure with the Failure function even if the value is truthy', () => {
    expect(Validation.Failure('a reason').isSuccess).toBe(false);
  });

  it('returns the default value when Failure with withDefalault', () => {
    expect(Validation.Failure().withDefault('default')).toEqual('default');
    expect(Validation.withDefault('default', Validation.Failure())).toEqual('default');
  });

  it('returns the main value when Success with withDefalault', () => {
    expect(aSuccess.withDefault('error')).toEqual(successVal);
    expect(Validation.withDefault('error', aSuccess)).toEqual(successVal);
  });


  it('maps successes and not failures', () => {
    expect(aSuccess.map(_ => 'r')._value).toEqual('r');
    expect(Validation.map(_ => 'r', aSuccess)._value).toEqual('r');
    expect(Validation.map(_ => 'r')(aSuccess)._value).toEqual('r');

    expect(aFailure.map(_ => 'r')._value).toEqual(failureVal);
    expect(Validation.map(_ => 'r', aFailure)._value).toEqual(failureVal);
    expect(Validation.map(_ => 'r')(aFailure)._value).toEqual(failureVal);
  });

  it('outputs a Validation type when mapping', () => {
    expect(aSuccess.map(_ => 'r') instanceof Validation).toBe(true);
    expect(Validation.map(_ => 'r', aSuccess) instanceof Validation).toBe(true);
    expect(Validation.map(_ => 'r')(aSuccess) instanceof Validation).toBe(true);

    expect(aFailure.map(_ => 'r') instanceof Validation).toBe(true);
    expect(Validation.map(_ => 'r', aFailure) instanceof Validation).toBe(true);
    expect(Validation.map(_ => 'r')(aFailure) instanceof Validation).toBe(true);
  });

  it('maps only successes with mapSuccess', () => {
    expect(aSuccess.mapSuccess(_ => 'r')._value).toEqual('r');
    expect(Validation.mapSuccess(_ => 'r', aSuccess)._value).toEqual('r');
    expect(Validation.mapSuccess(_ => 'r')(aSuccess)._value).toEqual('r');

    expect(aFailure.mapSuccess(_ => 'r')._value).toEqual(failureVal);
    expect(Validation.mapSuccess(_ => 'r', aFailure)._value).toEqual(failureVal);
    expect(Validation.mapSuccess(_ => 'r')(aFailure)._value).toEqual(failureVal);
  });

  it('maps only failures with mapFailure', () => {
    expect(aSuccess.mapFailure(_ => 'r')._value).toEqual(successVal);
    expect(Validation.mapFailure(_ => 'r', aSuccess)._value).toEqual(successVal);
    expect(Validation.mapFailure(_ => 'r')(aSuccess)._value).toEqual(successVal);

    expect(aFailure.mapFailure(_ => 'r')._value).toEqual('r');
    expect(Validation.mapFailure(_ => 'r', aFailure)._value).toEqual('r');
    expect(Validation.mapFailure(_ => 'r')(aFailure)._value).toEqual('r');
  });

  it('throws with throwFailure when Failure and doesn\'t when Success', () => {
    expect(_ => aFailure.throwFailure()).toThrow();
    expect(_ => Validation.throwFailure(aFailure)).toThrow();

    expect(_ => aSuccess.throwFailure()).not.toThrow();
    expect(_ => Validation.throwFailure(aSuccess)).not.toThrow();
  });

  it('calls the callback with andThen only when Success', () => {
    expect(aSuccess.andThen(_ => aSuccess2)).toEqual(aSuccess2);
    expect(Validation.andThen(_ => aSuccess2, aSuccess)).toEqual(aSuccess2);
    expect(Validation.andThen(_ => aSuccess2)(aSuccess)).toEqual(aSuccess2);

    expect(aFailure.andThen(_ => 'r')).toEqual(aFailure);
    expect(Validation.andThen(_ => 'r', aFailure)).toEqual(aFailure);
    expect(Validation.andThen(_ => 'r')(aFailure)).toEqual(aFailure);
  });

  it('throws when andThen callback does not return a validation', () => {
    expect(_ => aSuccess.andThen(_ => 'r')).toThrow();
    expect(_ => Validation.andThen(_ => 'r', aSuccess)).toThrow();
    expect(_ => Validation.andThen(_ => 'r')(aSuccess)).toThrow();
  });

  it('chains only successes', () => {
    const success1 = Validation.Success('1');
    const success2 = Validation.Success('2');

    expect(success1.chain(success2)._value).toEqual('2');
    expect(Validation.chain(success1, success2)._value).toEqual('2');
    expect(Validation.chain(success1)(success2)._value).toEqual('2');

    expect(aFailure.chain(success2)._value).toEqual(failureVal);
    expect(Validation.chain(aFailure, success2)._value).toEqual(failureVal);
    expect(Validation.chain(aFailure)(success2)._value).toEqual(failureVal);
  });
});
