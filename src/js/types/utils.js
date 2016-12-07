import Immutable from 'seamless-immutable';
import Validation from './Validation';
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
      customCheck,
      Immutable,
    ),
  };
}
