/* eslint-disable new-cap */
import Validation from './Validation';
import Maybe from './Maybe';
import { curry, pipe } from 'ramda';

export const errMsg = curry((prop, errorMessage) =>
  `Invalid property value for ${prop}. ${errorMessage}`
);

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

export const array = curry((subType, v) => {
  if (v instanceof Validation) {
    return Validation.andThen(array, v);
  }

  if (!Array.isArray(v)) {
    return Validation.Failure(`${v} is not an array`);
  }

  const subtypesValidaton = v
    .map(subType)
    .reduce(Validation.chain, Validation.Success(v));

  if (Validation.isSuccess(subtypesValidaton)) {
    return Validation.Success(v);
  }
  return Validation.mapFailure(errMsg('array'));
});

export const date = v => (
  v !== undefined && v instanceof Date
    ? Validation.Success(v)
    : Validation.Failure(`${v} is not a Date`)
);

export const nullable = curry((subType, v) => (
   v === null
   ? Validation.Success(v)
   : Validation.map(_ => Validation.Success(v), subType(v))
));

export const maybe = curry((subType, v) => (
  typeof v === 'object' && Validation.isSuccess(bool(v.isNothing))
    ? pipe(
        Maybe.map(subType),
        Maybe.map(Validation.map(_ => Validation.Success(v))),
        Maybe.withDefault(Validation.Success(v)),
      )(v)
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

const haveSameKeys = (o1, o2) => {
  const k1 = Object.keys(o1);
  const k2 = Object.keys(o2);
  return k1.reduce((out, key) => out && k2.includes(key), true);
};

export const object = curry((typeSignature, v) => {
  if (!haveSameKeys(typeSignature, v)) {
    return Validation.Failure(
      `Object does not have same keys as its type signature:
      Keys present: ${Object.keys(v)}
      Keys expected: ${Object.keys(typeSignature)}`
    );
  }

  return Object.keys(typeSignature)
  .reduce(
    (outcome, key) =>
      Validation.chain(
        outcome,
        pipe(
            typeSignature[key],
            Validation.mapFailure(errMsg(key)),
            Validation.mapSuccess(_ => v)
          )(v[key])
      ),
      Validation.Success(v)
  );
});

export default {
  int,
  float,
  string,
  bool,
  nullType,
  nullable,
  array,
  date,
  maybe,
  remoteData,
  request,
  response,
  object,
};
