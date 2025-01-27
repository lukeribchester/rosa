import { SegmentTree } from './segment-tree.js';

/* ----- Information ----- */

// 1 year = 525_600 minutes = 31_536_000 seconds = 31_536_000 milliseconds
// 15 minutes = 900 seconds = 900_000 milliseconds
// (1 year / 15 minutes) = 35_040 segments

// Given that a segment should represent 15 minutes, if the calendar is
// constructed to represent 1 year, then there should exist 35_040 segments.

/* ----- Configuration ----- */

// Reference epochs for the calendar.
// const calendarStart: number = new Date('2025-01-01T00:00:00Z').getTime();
const calendarStart: number = 1;
// const calendarEnd: number = new Date('2025-01-04T00:00:00Z').getTime();
const calendarEnd: number = 10;

// Segment size in milliseconds (i.e. 15 minutes — the smallest possible calendar block).
// const segmentSize: number = 900000;
const segmentSize: number = 1;

// Total number of segments (given the calendar window and segment size).
const totalSegments: number = Math.floor(
  (calendarEnd - calendarStart) / segmentSize
);

// Initialise the segment tree (true = fully available).
const tree: SegmentTree = new SegmentTree(new Array(totalSegments).fill(true));

console.log('Initialised tree:', tree);

/* ----- Schedule Appointment ----- */

// Appointment.
const appointment = {
  // from: new Date('2025-01-01T00:00:00Z').getTime(),
  from: 8,
  // to: new Date('2025-01-04T00:00:00Z').getTime()
  to: 9,
};
// const { mappedAppointmentStart, mappedAppointmentEnd } = mapEpochsToCalendarSegmentIndices(appointment.from, appointment.to);

// Update the segments in the appointment range.
// tree.updateRange(mappedAppointmentStart, mappedAppointmentEnd, false);
tree.updateRange(appointment.from, appointment.to, false);

console.log('Updated tree:', tree);

/* ----- Query ----- */

// Query.
const query = {
  // from: new Date('2025-01-01T00:00:00Z').getTime(),
  from: 8,
  // to: new Date('2025-01-02T00:00:00Z').getTime()
  to: 9,
};
// const { mappedQueryStart, mappedQueryEnd } = mapEpochsToCalendarSegmentIndices(query.from, query.to);

// Query the tree.
// const available = tree.queryRange(mappedQueryStart, mappedQueryEnd);
const available = tree.queryRange(query.from, query.to);
console.log('Availability:', available);

/* ----- Utilities ----- */

function mapEpochsToCalendarSegmentIndices(from: number, to: number): any {
  // Align the 'from' timestamp to the beginning of a segment.
  const segmentStart = Math.floor((from - calendarStart) / segmentSize);

  // Align the 'to' timestamp to the end of a segment.
  const segmentEnd = Math.ceil((to - calendarStart) / segmentSize);

  return { segmentStart, segmentEnd };
}
