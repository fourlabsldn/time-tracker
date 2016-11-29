import { curry } from 'ramda';

/**
  type Validation
    = Success a
    | Failure b
 */

const types = {
  Just: 'Just',
  Nothing: 'Nothing',
};


function Maybe(value, type) {
  // Check that a valid type is being used
  const isJust = type === types.Just;
  return {
    isJust,
    isNothing: !isJust,
    withDefault: defaultVal => (isJust ? value : defaultVal),
    map: f => (isJust
      ? new Maybe.Just(f(value))
      : new Maybe.Nothing()
    ),
  };
}

// Static functions
Maybe.Just = v => new Maybe(v, types.Just);
Maybe.Nothing = _ => new Maybe(null, types.Nothing);

Maybe.isJust = v => v.isJust;
Maybe.isNothing = v => v.isNothing;
Maybe.withDefault = curry((defaultVal, v) => v.withDefault(defaultVal));
Maybe.map = curry((f, v) => v.map(f));

export default Maybe;
