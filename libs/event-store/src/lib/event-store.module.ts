import { Module } from '@nestjs/common';

import { EventStoreService } from './event-store.service.js';

@Module({
  controllers: [],
  providers: [EventStoreService],
  exports: [],
})
export class EventStoreModule {}
