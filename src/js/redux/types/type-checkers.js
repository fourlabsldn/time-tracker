/* eslint-disable new-cap */
import Validation from 'data.validation';
import { curry, and } from 'ramda';

// ===================================================================
//  General Type checkers
// ===================================================================

export const int = v => (
  typeof v === 'number' && (v % 1) === 0
    ? Validation.Success()
    : Validation.Failure(`${v} is not an integer`)
);

export const float = v => (
  typeof v === 'number'
    ? Validation.Success()
    : Validation.Failure(`${v} is not a float`)
);

export const string = v => (
  typeof v === 'string'
    ? Validation.Success()
    : Validation.Failure(`${v} is not a string`)
);

export const bool = v => (
  typeof v === 'boolean'
    ? Validation.Success()
    : Validation.Failure(`${v} is not a boolean`)
);

export const array = curry((subType, v) => (
  Array.isArray(v) && v.map(subType).reduce(and)
    ? Validation.Success()
    : Validation.Failure(`${v} is not an array`)
));

export const date = v => (
  v !== undefined && v instanceof Date
    ? Validation.Success()
    : Validation.Failure(`${v} is not a Date`)
);

export const maybe = curry((subType, v) => (
  typeof v === 'object' && bool(v.isNothing)
    ? v.map(subType).getOrElse(Validation.Success())
    : Validation.Failure(`${v} is not of type Maybe`)
));

export const remoteData = curry((subTypeSuccess, subTypeFailure, v) => (
  typeof v === 'object' && typeof v.isNotAsked === 'function'
    ? Validation.Success()
    : Validation.Failure(`${v} is not of type RemoteData.`)
));

export const errMsg = curry((prop, errorMessage) =>
  `Invalid property value for ${prop}. ${errorMessage}`
);

export const object = curry((typeSignature, v) =>
  Object.keys(typeSignature)
  .reduce(
    (outcome, key) => (
      outcome.isSuccess
        ? typeSignature[key](v[key]).failureMap(errMsg(key))
        : outcome
    ),
    Validation.Success()
  ));
