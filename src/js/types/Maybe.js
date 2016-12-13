/* eslint-disable new-cap */
import { curry, pipe } from 'ramda';

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
    ? Maybe.of(f(value))
    : Maybe.Nothing()
  );
  this.chain = f => this.map(f).withDefault(Maybe.Nothing());
}

// Static functions
Maybe.Just = v => new Maybe(v, types.Just);
Maybe.Nothing = _ => new Maybe(null, types.Nothing);
Maybe.of = Maybe.Just; // the function itself will take care of nulls and undefineds

Maybe.isJust = v => v.isJust;
Maybe.isNothing = v => v.isNothing;
Maybe.withDefault = curry((defaultVal, v) => v.withDefault(defaultVal));
Maybe.map = curry((f, v) => v.map(f));
Maybe.map2 = curry((f, v1, v2) => (
  Maybe.isJust(v1) && Maybe.isJust(v2)
  ? Maybe.of(f(
      Maybe.withDefault(null, v1),
      Maybe.withDefault(null, v2)
    ))
  : Maybe.Nothing()
));
Maybe.chain = curry((v, f) => v.chain(f));

export default Maybe;
