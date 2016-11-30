export default (state, action) =>
  Object.assign({}, state, { availableProjects: action.fetchStatus });
