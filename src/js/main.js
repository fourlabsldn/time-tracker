// @flow
import React from 'react';
import ReactDOM from 'react-dom';

export default function () {
  const wrapper: HTMLElement = document.createElement('div');

  return ReactDOM.render(<div> Hello world!</div>, wrapper);
}
