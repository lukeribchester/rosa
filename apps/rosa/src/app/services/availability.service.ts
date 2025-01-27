import { Injectable } from '@nestjs/common';

@Injectable()
export class AvailabilityService {
  constructor(private eventStoreService: EventStoreService) {}

  public listAvailability(to: Date, from: Date): string {
    // Implementation:
    // 1. Retrieve event store events.
    // 2. Parse events (for recurrence rules etc.).
    // 3. Populate the segment tree.
    // 4. Query the segment tree.

    const events: Event[] = this.eventStoreService.getEvents();

    return `${to} - ${from}`;
  }

  public nextAvailability(date: Date): string {
    return `${date}`;
  }
}
