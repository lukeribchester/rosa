import { Module } from '@nestjs/common';
import { AvailabilityController } from './controllers/availability.controller';
import { AvailabilityService } from './services/availability.service';

@Module({
  imports: [],
  controllers: [AvailabilityController],
  providers: [AvailabilityService],
})
export class AppModule {}
