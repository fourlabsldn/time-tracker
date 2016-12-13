/* eslint-env jasmine */
/* eslint-disable new-cap, no-underscore-dangle */
import { pipe } from 'ramda';
import {
  Project,
  Recording,
  Validation,
} from '../../js/types';
import Immutable from 'seamless-immutable';

describe('Project type', () => {
  const delivRec = Recording.of({ startTime: null, intervals: [] });
  const mockDeliverable = { name: 'aaa', url: 'www', recording: delivRec };
  const validName = 'name';
  const validUrl = 'url';
  const unselectedDeliverables = [mockDeliverable];
  const valid = {
    name: validName,
    url: validUrl,
    unselectedDeliverables,
    selectedDeliverable: mockDeliverable,
  };
  const isValid = pipe(
    v => Immutable(v).asMutable({ deep: true }),
    Project.typeCheck,
    Validation.isSuccess
  );


  it('typeChecks ok', () => {
    const invalid1 = {
      name: validName,
      url: validUrl,
      unselectedDeliverables: null,
      selectedDeliverable: null,
    };
    const invalid2 = {
      name: validName,
      url: validUrl,
      unselectedDeliverables: [],
      selectedDeliverable: [],
    };
    const invalid3 = {};

    expect(isValid(invalid1)).toEqual(false);
    expect(isValid(invalid2)).toEqual(false);
    expect(isValid(invalid3)).toEqual(false);
    expect(isValid(valid)).toEqual(true);
  });

  it('returns name without breaking with null', () => {
    const getName = pipe(Project.of, Project.getName);
    expect(getName(valid)).toEqual(validName);
    expect(getName({})).toEqual(null);
    expect(getName()).toEqual(null);
    expect(getName(null)).toEqual(null);
  });

  it('returns url without breaking with null', () => {
    const getUrl = pipe(Project.of, Project.getUrl);
    expect(getUrl(valid)).toEqual(validUrl);
    expect(getUrl({})).toEqual(null);
    expect(getUrl()).toEqual(null);
    expect(getUrl(null)).toEqual(null);
  });

  it('returns deliverables without breaking with null', () => {
    const getDeliverables = pipe(Project.of, Project.getDeliverables);
    expect(getDeliverables(valid).find(m => m.url === mockDeliverable.url)).toBeTruthy();
    expect(getDeliverables({})).toEqual([]);
    expect(getDeliverables()).toEqual([]);
    expect(getDeliverables(null)).toEqual([]);
  });

  it('returns selectedDeliverable without breaking with null', () => {
    const getSelectedDeliverable = pipe(Project.of, Project.getSelectedDeliverable);
    expect(getSelectedDeliverable(valid)).toEqual(mockDeliverable);
    expect(getSelectedDeliverable({})).toEqual(null);
    expect(getSelectedDeliverable()).toEqual(null);
    expect(getSelectedDeliverable(null)).toEqual(null);
  });

  it('updates a deliverable that is selected', () => {
    const mockDeliverableChanged = Object.assign({}, mockDeliverable, { url: 'jjj' });
    const mockProject = {
      name: 'asfd',
      url: 'asdf',
      unselectedDeliverables: [],
      selectedDeliverable: mockDeliverable,
    };

    const updateAndGetDeliverables = pipe(
      Project.updateDeliverable,
      Project.getDeliverables,
    );

    expect(
      updateAndGetDeliverables(mockProject, mockDeliverableChanged)
        .find(m => m.url === mockDeliverableChanged.url)
    ).toBeTruthy();
    expect(
      updateAndGetDeliverables(mockProject, mockDeliverableChanged)
        .find(m => m.url === mockDeliverable.url)
    ).toBeFalsy();

    expect(pipe(
        Project.updateDeliverable,
        isValid
      )(mockProject, mockDeliverableChanged)
    ).toEqual(true);
  });

  it('updates a deliverable that is not selected', () => {
    const mockDeliverableChanged = Object.assign({}, mockDeliverable, { url: 'jjj' });
    const mockProject = {
      name: 'asfd',
      url: 'asdf',
      unselectedDeliverables: [mockDeliverable],
      selectedDeliverable: null,
    };

    const updateAndGetDeliverables = pipe(
      Project.updateDeliverable,
      Project.getDeliverables,
    );

    expect(
      updateAndGetDeliverables(mockProject, mockDeliverableChanged)
        .find(m => m.url === mockDeliverableChanged.url)
    ).toBeTruthy();
    expect(
      updateAndGetDeliverables(mockProject, mockDeliverableChanged)
        .find(m => m.url === mockDeliverable.url)
    ).toBeFalsy();

    expect(pipe(
        Project.updateDeliverable,
        isValid
      )(mockProject, mockDeliverableChanged)
    ).toEqual(true);
  });

  it('handles nulls when updating deliverables', () => {
    expect(_ => Project.updateDeliverable(null, null)).not.toThrow();
    expect(_ => Project.updateDeliverable(valid, null)).not.toThrow();
    expect(_ => Project.updateDeliverable(valid, valid)).not.toThrow();
  });
});
