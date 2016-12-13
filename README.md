# Time tracker
[![Build Status](https://travis-ci.org/fourlabsldn/time-tracker.svg?branch=master)](https://travis-ci.org/fourlabsldn/time-tracker)

[Demo](https://fourlabsldn.github.io/time-tracker/examples/widget/index.html)

## Time intervals
Recordings have fields to describe it's total running time. It's `startTime` field describes whether it is currently recording or not and, if recording, since when. Intervals describe pairs of start and end timestamps. The total time is calculated by summing the duration of all intervals and adding to it the difference between the current time and the timestamp set in startTime.

```
{
  startTime: <Date | null>
  intervals: [
    {
      start: <Date>
      end: <Date>
    }
  ]
}
```
