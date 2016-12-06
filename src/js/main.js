// @flow
import React from 'react';
import ReactDOM from 'react-dom';
import Widget from './Widget';
import store from './store';

export default function () {
  const wrapper: HTMLElement = document.createElement('div');

  ReactDOM.render(<Widget store={store} />, wrapper);
  return wrapper;
}
