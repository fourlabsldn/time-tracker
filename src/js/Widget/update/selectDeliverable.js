import { propEq, not, pipe } from 'ramda';
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
    ) || null;

  const newUnselectedDeliverables = allSelectedProjectDeliverables(model)
    .filter(pipe(
        propEq('name', action.deliverableName),
        not
    ));

  return pipe(
    updateAt(['selectedProject', 'selectedDeliverable'], newSelectedDeliverable),
    updateAt(['selectedProject', 'unselectedDeliverables'], newUnselectedDeliverables)
  )(model);
};
