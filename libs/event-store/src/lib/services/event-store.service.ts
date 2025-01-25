import { Injectable } from '@nestjs/common';

import { Event } from '../interfaces/event.interface.js';

@Injectable()
export class EventStoreService {
  private readonly events: Event[] = [];

  public addEvent(event: Event): void {
    this.events.push(event);
  }

  public getEvents(): Event[] {
    return JSON.parse(JSON.stringify(this.events));
  }
}
