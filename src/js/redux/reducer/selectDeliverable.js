import { Maybe } from '../../types';
import { pipe, prop, not, propEq } from 'ramda';

export default (state, action) => {
  const allDeliverables = pipe(
    Maybe.map(prop('project')),
    Maybe.map(({ deliverables, selectedDeliverable }) => [...deliverables, selectedDeliverable]),
    Maybe.withDefault([])
  )(state.recording);

  const selectedDeliverable = allDeliverables.find(propEq('name', action.name));
  const deliverables = allDeliverables.filter(pipe(propEq('name', action.name), not));

  const recording = Maybe.map(r => Object.assign(
        {},
        r,
        { project: Object.assign({}, r.project, { selectedDeliverable, deliverables }) }
      ),
      state.recording
    );

  return Object.assign(
    {},
    state,
    { recording }
  );
};
