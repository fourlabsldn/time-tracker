import { updateAt } from './utils';
import { isNil } from 'ramda';

export default (model, action) => {
  const minimise = isNil(action.minimise)
    ? !model.minimised
    : !!action.minimise;
  return updateAt(['minimised'], minimise, model);
};
