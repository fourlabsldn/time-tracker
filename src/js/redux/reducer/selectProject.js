/* eslint-disable new-cap */
import { RemoteData, Maybe } from '../../types';
import { pipe, prop, propEq } from 'ramda';


export default (state, action) => {
  const selectedName = action.name;

  const availableProjects = pipe(
    RemoteData.toMaybe,
    Maybe.withDefault([])
  )(state.availableProjects);

  const selectedProjectInArray = pipe(
    Maybe.map(prop('project')),
    Maybe.map(Array),
    Maybe.withDefault([])
  )(state.recording);

  const allProjects = [...availableProjects, ...selectedProjectInArray];

  const newAvailableProjects = allProjects.filter(p => p.name !== selectedName);
  const newSelectedProject = allProjects.find(propEq('name', selectedName));

  return Object.assign(
    {},
    state,
    { availableProjects: RemoteData.Success(newAvailableProjects),
      recording: Maybe.Just({
        project: newSelectedProject,
        startTime: Maybe.Nothing(),
        intervals: [],
      }),
    }
  );
};
