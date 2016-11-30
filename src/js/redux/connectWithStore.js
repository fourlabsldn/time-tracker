import { connect } from 'react-redux';
import React from 'react';

export default function connectWithStore(...args) {
  return function (WrappedComponent, store) {
    const ConnectedWrappedComponent = connect(...args)(WrappedComponent);
    return function (props) {
      return <ConnectedWrappedComponent {...props} store={store} />;
    };
  };
}

// Usage:
// Stuff = connectWithStore(mapStateToProps, mapSomethingsomething..)(widget, store)
