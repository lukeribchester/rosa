import { Injectable } from '@nestjs/common';

@Injectable()
export class AvailabilityService {
  public listAvailability(to: Date, from: Date): string {
    return `${to} - ${from}`;
  }

  public nextAvailability(date: Date): string {
    return `${date}`;
  }
}
