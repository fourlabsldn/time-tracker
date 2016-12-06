import { object, string, nullable } from './type-checkers';
import { immutableConstructor } from './utils';
import Recording from './Recording';

export const typeCheck = object({
  name: string,
  url: string,
  recording: nullable(Recording.typeCheck),
});

const Deliverable = immutableConstructor(typeCheck);

Object.assign(Deliverable, {
  typeCheck,
});
export default Deliverable;
