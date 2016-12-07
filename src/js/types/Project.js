import { string, object, array, nullable } from './type-checkers';
import Deliverable from './Deliverable';
import { immutableConstructor } from './utils';
import { propOr, curry } from 'ramda';
import Immutable from 'seamless-immutable';
// ========================================================================
//
//     ALL GETTERS AND SETTERS (PUBLIC OR NOT) MUST BE IN THIS FILE
//
// ========================================================================

export const typeCheck = object({
  name: string,
  url: string,
  unselectedDeliverables: array(Deliverable.typeCheck),
  selectedDeliverable: nullable(Deliverable.typeCheck),
});

// unselectedDeliverables and selectedDeliverables together form a ziplist.
const Project = immutableConstructor(typeCheck);

// GETTERS
export const getName = propOr(null, 'name');
export const getUrl = propOr(null, 'url');
export const getSelectedDeliverable = propOr(null, 'selectedDeliverable');
export const getDeliverables = model => (
  getSelectedDeliverable(model)
    ? [getSelectedDeliverable(model), ...propOr([], 'unselectedDeliverables', model)]
    : propOr([], 'unselectedDeliverables', model)
  );

export const setSelectedDeliverable = curry((model, newSelected) => {
  const all = getDeliverables(model);
  const newDeliverables = all.filter(
    d => Deliverable.getName(d) !== Deliverable.getName(newSelected)
  );

  return Immutable.merge({
    unselectedDeliverables: newDeliverables,
    selectedDeliverable: newSelected,
  });
});


// NO SETTERS
Object.assign(Project, {
  typeCheck,
  getName,
  getUrl,
  getDeliverables,
  getSelectedDeliverable,
  setSelectedDeliverable,
});

export default Project;
