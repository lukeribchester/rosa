import { Module } from '@nestjs/common';
import { AvailabilityController } from './controllers/availability.controller';

@Module({
  imports: [],
  controllers: [AvailabilityController],
  providers: [],
})
export class AppModule {}
