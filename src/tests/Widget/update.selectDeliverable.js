/* eslint-env jasmine */
import selectDeliverable from '../../js/Widget/update/selectDeliverable';
import { Project, Deliverable } from '../../js/types';
import {
  mockProject,
  mockUnselectedProject,
  mockModel,
} from './mockData';

describe('update.selectDeliverable', () => {
  it('selects a deliverable from the selected project successfully', () => {
    const mockAction = {
      project: mockProject,
      deliverable: mockProject.unselectedDeliverables[0],
    };
    const modifiedModel = selectDeliverable(mockModel, mockAction);
    expect(Project.isSame(mockProject, modifiedModel.selectedProject)).toEqual(true);
    expect(Deliverable.isSame(
      mockProject.unselectedDeliverables[0],
      modifiedModel.selectedProject.selectedDeliverable
    )).toEqual(true);
  });

  it('selects a deliverable from the a non selected project successfully', () => {
    const mockAction = {
      project: mockUnselectedProject,
      deliverable: mockUnselectedProject.unselectedDeliverables[0],
    };
    const modifiedModel = selectDeliverable(mockModel, mockAction);
    expect(Project.isSame(mockUnselectedProject, modifiedModel.selectedProject)).toEqual(true);
    expect(Deliverable.isSame(
      mockUnselectedProject.unselectedDeliverables[0],
      modifiedModel.selectedProject.selectedDeliverable
    )).toEqual(true);
  });
});
