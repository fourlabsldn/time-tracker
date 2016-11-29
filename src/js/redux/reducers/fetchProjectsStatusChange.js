export default (state, action) =>
  Object.assign({}, state, { projects: action.status });
