/* eslint-env jasmine */
import toggleRecording from '../../js/Widget/update/toggleRecording';
import { Recording, Deliverable } from '../../js/types';
import { pipe, prop } from 'ramda';
import { recordingsInfo } from '../../js/Widget/update/utils';
import {
  mockDeliverable,
  mockProject,
  mockUnselectedDeliverable,
  mockUnselectedProject,
  mockModel,
} from './mockData';

describe('Update.toggleRecording', () => {
  it('stops other recordings when toggling the selected project', () => {
    const mockAction = {
      project: mockProject,
      deliverable: mockDeliverable,
    };

    const toggledModel = toggleRecording(mockModel, mockAction);

    const deliverablesRecording = recordingsInfo(toggledModel)
      .filter(pipe(prop('recording'), Recording.isRecording))
      .map(prop('deliverable'));

    expect(deliverablesRecording.length).toEqual(1);
    const sameName =
      Deliverable.getName(mockDeliverable)
      === Deliverable.getName(deliverablesRecording[0]);
    expect(sameName).toEqual(true);
  });

  it('stops other recordings when toggling an unselected project and deliverable', () => {
    const mockAction = {
      project: mockUnselectedProject,
      deliverable: mockUnselectedDeliverable,
    };

    const toggledModel = toggleRecording(mockModel, mockAction);

    const deliverablesRecording = recordingsInfo(toggledModel)
      .filter(pipe(prop('recording'), Recording.isRecording))
      .map(prop('deliverable'));

    expect(deliverablesRecording.length).toEqual(1);
    const sameName =
      Deliverable.getName(mockUnselectedDeliverable)
      === Deliverable.getName(deliverablesRecording[0]);
    expect(sameName).toEqual(true);
  });
});
