/* eslint-disable new-cap */
import modelType from '../model';
import { Validation } from '../../types';
import { pipe } from 'ramda';
import startStopRecording from './startStopRecording';
import selectProject from './selectProject';
import selectDeliverable from './selectDeliverable';
import setProjects from './setProjects';
import toggleMinimised from './toggleMinimised';

const actionHandlers = {
  startStopRecording,
  selectProject,
  selectDeliverable,
  setProjects,
  toggleMinimised,
};

export default function update(model, action) {
  const actionName = action.type.replace('WIDGET_', '');
  return pipe(
    actionHandlers[actionName],
    modelType,
    Validation.throwFailure,
    Validation.withDefault(null)
  )(model, action);
}
