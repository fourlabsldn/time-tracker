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
  return {
    isSuccess: () => type.name === types.Success,
    isFailure: () => type.name === types.Failure,
    getOrElse: elseVal => (type === types.Success ? value : elseVal),
    map: f => (type === types.Success
      ? new Validation(f(value), type)
      : new Validation(value, type)
    ),
    mapFailure: f => (type === types.Failure
      ? new Validation(f(value), type)
      : new Validation(value, type)
    ),
  };
}

// Static functions
Validation.Success = v => new Validation(v, types.Success);
Validation.Failure = v => new Validation(v, types.Failure);

Validation.isSuccess = v => v.isSuccess();
Validation.isFailure = v => v.isFailure();
Validation.getOrElse = curry((elseVal, v) => v.getOrElse(elseVal));
Validation.map = curry((f, v) => v.map(f));
Validation.mapFailure = curry((f, v) => v.mapFailure(f));

export default Validation;
