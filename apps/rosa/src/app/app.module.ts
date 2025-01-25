import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AvailabilityController } from './controllers/availability.controller';

@Module({
  imports: [],
  controllers: [AppController, AvailabilityController],
  providers: [AppService],
})
export class AppModule {}
