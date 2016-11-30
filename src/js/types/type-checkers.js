/* eslint-disable new-cap */
import Validation from './Validation';
import Maybe from './Maybe';
import { curry, and, pipe } from 'ramda';

// All type checks return a Validation object.
// ===================================================================
//  General Type checkers
// ===================================================================

export const int = v => (
  typeof v === 'number' && (v % 1) === 0
    ? Validation.Success(v)
    : Validation.Failure(`${v} is not an integer`)
);

export const float = v => (
  typeof v === 'number'
    ? Validation.Success(v)
    : Validation.Failure(`${v} is not a float`)
);

export const string = v => (
  typeof v === 'string'
    ? Validation.Success(v)
    : Validation.Failure(`${v} is not a string`)
);

export const bool = v => (
  typeof v === 'boolean'
    ? Validation.Success(v)
    : Validation.Failure(`${v} is not a boolean`)
);

export const nullType = v => (
  typeof v === 'object' && v === null
    ? Validation.Success(v)
    : Validation.Failure(`${v} is not null`)
);

export const array = curry((subType, v) => (
  Array.isArray(v) && v.map(subType).map(Validation.isSuccess).reduce(and)
    ? Validation.Success(v)
    : Validation.Failure(`${v} is not an array`)
));

export const date = v => (
  v !== undefined && v instanceof Date
    ? Validation.Success(v)
    : Validation.Failure(`${v} is not a Date`)
);

export const maybe = curry((subType, v) => (
  typeof v === 'object' && Validation.isSuccess(bool(v.isNothing))
    ? pipe(
        Maybe.map(subType),
        Maybe.withDefault(Validation.Success()),
      )
    : Validation.Failure(`${v} is not of type Maybe`)
));

export const remoteData = v => (
  typeof v === 'object' && Validation.isSuccess(bool(v.isNotAsked))
    ? Validation.Success(v)
    : Validation.Failure(`${v} is not of type RemoteData.`)
);

export const request = v => (
  typeof v === 'object' && v instanceof Request
    ? Validation.Success(v)
    : Validation.Failure(`${v} is not of type Request.`)
);

export const response = v => (
  typeof v === 'object' && v instanceof Response
    ? Validation.Success(v)
    : Validation.Failure(`${v} is not of type Response.`)
);

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
    Validation.Success(v)
  ));

export default {
  int,
  float,
  string,
  bool,
  nullType,
  array,
  date,
  maybe,
  remoteData,
  request,
  response,
  object,
};
