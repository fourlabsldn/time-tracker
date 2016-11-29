import { curry } from 'ramda';

/**
  type Validation
    = Success a
    | Failure b
 */

const types = {
  Success: 'Success',
  Failure: 'Failure',
};


function Validation(value, type) {
  // Check that a valid type is being used
  const isSuccess = type.name === types.Success;
  return {
    isSuccess,
    isFailure: !isSuccess,
    withDefault: defaultVal => (isSuccess ? value : defaultVal),
    map: f => (isSuccess
      ? new Validation(f(value), type)
      : new Validation(value, type)
    ),
    mapFailure: f => (!isSuccess
      ? new Validation(f(value), type)
      : new Validation(value, type)
    ),
  };
}

// Static functions
Validation.Success = v => new Validation(v, types.Success);
Validation.Failure = v => new Validation(v, types.Failure);

Validation.isSuccess = v => v.isSuccess;
Validation.isFailure = v => v.isFailure;
Validation.withDefault = curry((defaultVal, v) => v.withDefault(defaultVal));
Validation.map = curry((f, v) => v.map(f));
Validation.mapFailure = curry((f, v) => v.mapFailure(f));

export default Validation;
