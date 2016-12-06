import { updateAt } from './utils';
import { isNil } from 'ramda';

export default (model, action) => {
  const minimised = isNil(action.minimised)
    ? !model.minimise
    : action.minimise;
  return updateAt(['minimised'], minimised, model);
};
