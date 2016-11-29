/* eslint-disable new-cap */
import { curry } from 'ramda';
import { Maybe } from '../../types';

const stopRecording = (time, recording) => (
  Maybe.isNothing(recording.startTime)
  ? recording
  : Object.assign(
    {},
    recording,
    { startTime: Maybe.Nothing(),
      intervals: recording.intervals.concat([
        { start: Maybe.withDefault(null, recording.startTime),
          end: new Date(),
        },
      ]),
    })
);

const startRecording = (time, recording) =>
  Object.assign(
    {},
    recording,
    { startTime: Maybe.Just(Maybe.withDefault(time)) }
  );

const startStopRecordingTime = curry(({ time, start }, recording) => (
  start
    ? startRecording(time, recording)
    : stopRecording(time, recording)
));

export default (state, action) =>
  Object.assign(
    {},
    state,
    { recording: Maybe.map(startStopRecordingTime(action), state.recording) }
  );
