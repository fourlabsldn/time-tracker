// @flow
import React from 'react';

import type { CompletedTask, ActiveTask } from './Types';

type Props = {};
type DefaultProps = {};
type State = {
  selectedDate: Date,
  completedTasks: Array<CompletedTask>,
  activeTasks: Array<ActiveTask>,
};

export default class Widget extends React.Component<DefaultProps, Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      selectedDate: new Date(),
      completedTasks: [],
      activeTasks: [],
    };
  }

  render() {
    return (<div> Imagine a widget </div>);
  }
}
