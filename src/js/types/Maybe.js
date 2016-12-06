/* eslint-disable new-cap */
import { curry } from 'ramda';

/**
  type Validation
    = Success a
    | Failure b
 */

const types = {
  Just: Math.random(),
  Nothing: Math.random(),
};


function Maybe(value, type) {
  // Check that a valid type is being used
  const isJust = value !== null && value !== undefined && type === types.Just;
  this.isJust = isJust;
  this.isNothing = !isJust;
  this.withDefault = defaultVal => (isJust ? value : defaultVal);
  this.map = f => (isJust
    ? Maybe.Just(f(value))
    : Maybe.Nothing()
  );
}

// Static functions
Maybe.of = v => Maybe.Just(v); // the function itself will take care of nulls and undefineds
Maybe.Just = v => new Maybe(v, types.Just);
Maybe.Nothing = _ => new Maybe(null, types.Nothing);

Maybe.isJust = v => v.isJust;
Maybe.isNothing = v => v.isNothing;
Maybe.withDefault = curry((defaultVal, v) => v.withDefault(defaultVal));
Maybe.map = curry((f, v) => v.map(f));

export default Maybe;
