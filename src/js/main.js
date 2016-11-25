// @flow
import React from 'react';
import ReactDOM from 'react-dom';
import Widget from './Widget';

export default function () {
  const wrapper: HTMLElement = document.createElement('div');

  ReactDOM.render(<Widget />, wrapper);
  return wrapper;
}
