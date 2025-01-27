import { Injectable, OnApplicationBootstrap } from '@nestjs/common';

import { Event } from '../interfaces/event.interface.js';

@Injectable()
export class EventStoreService implements OnApplicationBootstrap {
  private readonly events: Event[] = [];

  public addEvent(event: Event): void {
    this.events.push(event);
  }

  public getEvents(): Event[] {
    return JSON.parse(JSON.stringify(this.events));
  }

  public onApplicationBootstrap(): void {
    console.log('Mocking event store.');

    // Populate the event store with mock events.
    MOCK_EVENTS.forEach((event: Event) => {
      this.addEvent(event);
    });
  }
}

const MOCK_EVENTS: Event[] = [
  // Availability
  {
    id: 0,
    type: 'AVAILABILITY_UPDATED',
    payload: {
      from: new Date('2025-01-27T09:30:00Z').getTime(),
      to: new Date('2025-01-27T20:00:00Z').getTime(),
    },
  },
  {
    id: 1,
    type: 'AVAILABILITY_UPDATED',
    payload: {
      from: new Date('2025-01-28T09:30:00Z').getTime(),
      to: new Date('2025-01-28T20:00:00Z').getTime(),
    },
  },
  // Appointments
  {
    id: 2,
    type: 'APPOINTMENT_CREATED',
    payload: {
      from: new Date('2025-01-27T12:00:00Z').getTime(),
      to: new Date('2025-01-27T16:00:00Z').getTime(),
    },
  },
  {
    id: 3,
    type: 'APPOINTMENT_CREATED',
    payload: {
      from: new Date('2025-01-28T09:00:00Z').getTime(),
      to: new Date('2025-01-28T11:00:00Z').getTime(),
    },
  },
  {
    id: 4,
    type: 'APPOINTMENT_CREATED',
    payload: {
      from: new Date('2025-01-28T18:00:00Z').getTime(),
      to: new Date('2025-01-28T20:00:00Z').getTime(),
    },
  },
  // {
  //   id: 0,
  //   type: 'AVAILABILITY_UPDATED_RECURRING',
  //   payload: {
  //     from: '09:30:00',
  //     to: '20:00:00',
  //     recurring: {
  //       // Recurrance rules (i.e. Every Monday & Tuesday).
  //       // Infinitely recurring events would be added to the segment tree
  //       // spanning the entire rolling window which it would represent.
  //     }
  //   },
  // },
];
