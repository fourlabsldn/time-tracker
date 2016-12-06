import { createStore } from 'redux';
import WidgetUpdate from './Widget/update';
import { setProjects } from './Widget/actions';

const initialModel = {
  minimised: false,
  serverURL: './data.json',
  unselectedProjects: null,
  selectedProject: null,
};

const store = createStore(WidgetUpdate, initialModel);

// Perform some async initialisation task

fetch(initialModel.serverURL)
  .then(r => r.json())
  .then(r => r.projects)
  // Set projects is inside a function so that we use this.state.model at the
  // time of the response, rather than at the time of the request.
  .then(proj =>
    store.dispatch(setProjects(proj)),
  );

export default store;
