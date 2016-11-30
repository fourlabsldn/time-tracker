export default (state, action) =>
  Object.assign({}, state, { recording: action.fetchStatus });
