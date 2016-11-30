// @flow
import React from 'react';
import ReactDOM from 'react-dom';
import Widget from './Widget';
import store from './redux/store';
import { fetchProjects } from './redux/actions';

export default function () {
  const wrapper: HTMLElement = document.createElement('div');

  ReactDOM.render(<Widget />, wrapper);
  store.dispatch(fetchProjects());
  return wrapper;
}
