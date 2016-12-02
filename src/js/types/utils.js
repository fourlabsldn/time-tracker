import Immutable from 'seamless-immutable';
import Validation from '../types';
import { pipe } from 'ramda';

export const checkType = (typeChecker, customCheck) =>
  pipe(
    typeChecker,
    Validation.throwFailure,
    Validation.withDefault(null),
    customCheck
  );

export function immutableConstructor(typeChecker, customCheck = v => v) {
  return {
    of: pipe(
      checkType(typeChecker, customCheck),
      Immutable
    ),
  };
}
