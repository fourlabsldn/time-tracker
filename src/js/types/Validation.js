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
    : new Validation(value, type)
  );
  this._value = value; // JUST FOR DEBUGGING PURPOSES. DO NOT USE
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

export default Validation;
