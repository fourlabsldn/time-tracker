import { propEq, not, pipe } from 'ramda';
import assert from 'fl-assert';
import {
  selectedProject,
  allSelectedProjectDeliverables,
  updateAt,
} from './utils';

export default (model, action) => {
  if (!selectedProject(model)) {
    return model;
  }

  const newSelectedDeliverable = allSelectedProjectDeliverables(model)
    .find(
      propEq('name', action.deliverableName)
    );
  const newUnselectedDeliverables = allSelectedProjectDeliverables(model)
    .filter(pipe(
        propEq('name', action.deliverableName),
        not
    ));

  assert(newSelectedDeliverable, `No deliverables found with name ${action.deliverableName}`);
  return pipe(
    updateAt(['selectedProject', 'selectedDeliverable'], newSelectedDeliverable),
    updateAt(['selectedProject', 'unselectedDeliverables'], newUnselectedDeliverables)
  )(model);
};
