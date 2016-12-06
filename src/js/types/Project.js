import { string, object, array, nullable } from './type-checkers';
import Deliverable from './Deliverable';
import { immutableConstructor } from './utils';
import { prop, curry } from 'ramda';
import Immutable from 'seamless-immutable';
// ========================================================================
//
//     ALL GETTERS AND SETTERS (PUBLIC OR NOT) MUST BE IN THIS FILE
//
// ========================================================================

export const typeCheck = object({
  name: string,
  url: string,
  deliverables: array(Deliverable.typeCheck),
  selectedDeliverable: nullable(Deliverable.typeCheck),
});

// deliverables and selectedDeliverables together form a ziplist.
const Project = immutableConstructor(typeCheck);

// GETTERS
export const getName = prop('name');
export const getUrl = prop('url');
export const getSelectedDeliverable = prop('selectedDeliverable');
export const getDeliverables = model => (
  getSelectedDeliverable(model)
    ? [getSelectedDeliverable(model), ... model.deliverables]
    : model.deliverables
  );

export const setSelectedDeliverable = curry((model, newSelected) => {
  const all = getDeliverables(model);
  const newDeliverables = all.filter(
    d => Deliverable.getName(d) !== Deliverable.getName(newSelected)
  );

  return Immutable.merge({
    deliverables: newDeliverables,
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
