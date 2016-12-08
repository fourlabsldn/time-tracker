/* eslint-disable react/prop-types */
import React from 'react';
import { Project, Deliverable, Recording } from '../../types';
import { toggleRecording } from '../actions';
import Timer from './Timer';

const RecordingRow = ({ store, project, deliverable, recording }) => (
  <div className="TimeTracker-RecordingRow">
    <div className="TimeTracker-RecordingRow-names">
      <span className="TimeTracker-RecordingRow-deliverableName">
        {Deliverable.getName(deliverable)}
      </span>

      <span className="TimeTracker-RecordingRow-projectName">
        {Project.getName(project)}
      </span>
    </div>

    <button
      className={
        `TimeTracker-RecordingRow-start-stop btn fa ${
          Recording.isRecording(recording) ? 'btn-danger fa-pause' : 'btn-info fa-play'
        }`}
      onClick={
        _ => store.dispatch(toggleRecording(project, deliverable))
      }
    />

    <Timer recording={recording} />
  </div>
);


export default RecordingRow;
