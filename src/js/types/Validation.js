import { curry } from 'ramda';
import assert from 'fl-assert';

/**
  type Validation
    = Success a
    | Failure b
 */

const types = {
  Success: Math.random(),
  Failure: Math.random(),
};

const mapIf = curry((condition, value, f) => (condition ? f(value) : value));

// This function should never be called by anyone other than this file.
function Validation(value, type) {
  // Check that a valid type is being used
  const isSuccess = type === types.Success;
  if (!isSuccess) {
    console.log('Failing with reason:', value);
  }

  this.isSuccess = isSuccess;
  this.isFailure = !isSuccess;
  this.withDefault = defaultVal => (isSuccess ? value : defaultVal);
  this.map = f => new Validation(mapIf(isSuccess, value, f), type);
  this.mapSuccess = f => new Validation(mapIf(isSuccess, value, f), type);
  this.mapFailure = f => new Validation(mapIf(!isSuccess, value, f), type);
  this.throwFailure = _ => (!isSuccess
    ? assert(false, value)
    : this
  );
  this.andThen = f => {
    if (!isSuccess) {
      return this;
    }

    const val = f(value);
    assert(
      val instanceof Validation,
      'Value returned by Validation.andThen is not of type Validation'
    );
    return val;
  };
  // Validation -> Validation
  this.chain = v => {
    if (!isSuccess) { return this; }

    assert(
      v instanceof Validation,
      'Value passed to Validation.chain is not of type Validation'
    );

    return v;
  };
  // JUST FOR DEBUGGING PURPOSES. DO NOT USE
  this._value = value; // eslint-disable-line no-underscore-dangle
}

// Static functions
Validation.Success = v => new Validation(v, types.Success);
Validation.Failure = v => new Validation(v, types.Failure);

Validation.isSuccess = v => v.isSuccess;
Validation.isFailure = v => v.isFailure;
Validation.withDefault = curry((defaultVal, v) => v.withDefault(defaultVal));
Validation.map = curry((f, v) => v.map(f));
Validation.mapSuccess = curry((f, v) => v.mapSuccess(f));
Validation.mapFailure = curry((f, v) => v.mapFailure(f));
Validation.throwFailure = v => v.throwFailure();
Validation.andThen = curry((f, v) => v.andThen(f));
Validation.chain = curry((v1, v2) => v1.chain(v2));

export default Validation;
