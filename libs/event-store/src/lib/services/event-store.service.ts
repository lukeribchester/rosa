import { Injectable } from '@nestjs/common';

@Injectable()
export class EventStoreService {
  private readonly events: any[] = [];

  public addEvent(event: any): void {
    this.events.push(event);
  }

  public getEvents(): any[] {
    return JSON.parse(JSON.stringify(this.events));
  }
}
