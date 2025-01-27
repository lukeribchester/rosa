import { Module } from '@nestjs/common';
import { AvailabilityController } from './controllers/availability.controller';
import { AvailabilityService } from './services/availability.service';
import { EventStoreModule } from '@rosa/event-store';

@Module({
  imports: [EventStoreModule],
  controllers: [AvailabilityController],
  providers: [AvailabilityService, EventStoreService],
})
export class AppModule {}
