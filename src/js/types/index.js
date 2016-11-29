import Maybe from './Maybe';
import RemoteData from './RemoteData';
import Validation from './Validation';
import { State, stateTypeCheck } from './State';
import typeCheckers from './type-checkers';

export default {
  Maybe,
  RemoteData,
  Validation,
  State,
  checkers: Object.assign({}, typeCheckers, { stateTypeCheck }),
};
