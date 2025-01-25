import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AvailabilityController } from './controllers/availability.controller';

@Module({
  imports: [],
  controllers: [AvailabilityController],
  providers: [AppService],
})
export class AppModule {}
