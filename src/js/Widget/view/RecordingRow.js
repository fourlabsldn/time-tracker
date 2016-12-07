/* eslint-disable react/prop-types */
import React from 'react';
import { Project, Deliverable } from '../../types';
import Timer from './Timer';

const RecordingRow = ({ project, deliverable, recording }) => (
  <div className="TimeTracker-RecordingRow">
    <div className="TimeTracker-RecordingRow-names">
      <span className="TimeTracker-RecordingRow-projectName">
        {Project.getName(project)}
      </span>

      <span className="TimeTracker-RecordingRow-deliverableName">
        {Deliverable.getName(deliverable)}
      </span>
    </div>

    <Timer recording={recording} />
  </div>
);


export default RecordingRow;
