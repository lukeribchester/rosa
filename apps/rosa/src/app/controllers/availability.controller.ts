import { Controller, Get, Query } from '@nestjs/common';

import { AvailabilityService } from '../services/availability.service';

@Controller('availability')
export class AvailabilityController {
  constructor(private availabilityService: AvailabilityService) {}

  @Get('list')
  public listAvailability(
    @Query('from') from: Date,
    @Query('to') to: Date
  ): string {
    return this.availabilityService.listAvailability(from, to);
  }

  @Get('next')
  public nextAvailability(@Query('date') date: Date): string {
    return this.availabilityService.nextAvailability(date);
  }
}
