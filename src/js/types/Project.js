import { string, object, array, nullable } from '../type-checkers';
import Deliverable from '../Deliverable';
import { immutableConstructor } from '../utils';
import { prop } from 'ramda';

// ========================================================================
//
//     ALL GETTERS AND SETTERS (PUBLIC OR NOT) MUST BE IN THIS FILE
//
// ========================================================================

const projectTypeCheck = object({
  name: string,
  url: string,
  deliverables: array(Deliverable.typeCheck),
});

// deliverables and selectedDeliverables together form a ziplist.
const Project = immutableConstructor(projectTypeCheck);

// GETTERS
export const getName = prop('name');
export const getUrl = prop('url');
export const getDeliverables = prop('deliverables');

// NO SETTERS
Object.assign(Project, {
  getName,
  getUrl,
  getDeliverables,
});

export default Project;
