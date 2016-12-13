/* eslint-env jasmine */
import selectProject from '../../js/Widget/update/selectProject';
import { Project } from '../../js/types';
import {
  mockProject,
  mockUnselectedProject,
  mockModel,
} from './mockData';

describe('update.selectProject', () => {
  it('selects a project successfully', () => {
    const mockAction = {
      project: mockUnselectedProject,
      deliverable: mockUnselectedProject.unselectedDeliverables[0],
    };
    const modifiedModel = selectProject(mockModel, mockAction);
    expect(Project.isSame(mockUnselectedProject, modifiedModel.selectedProject)).toEqual(true);
  });

  it('selects a the current project successfully', () => {
    const mockAction = {
      project: mockProject,
    };
    const modifiedModel = selectProject(mockModel, mockAction);
    expect(Project.isSame(mockProject, modifiedModel.selectedProject)).toEqual(true);
  });
});
