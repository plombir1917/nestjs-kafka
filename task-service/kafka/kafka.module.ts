import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { kafkaConfig } from './kafka.config';
import { KafkaService } from './kafka.service';

@Module({
  imports: [ClientsModule.register([kafkaConfig])],
  providers: [KafkaService],
  exports: [KafkaService],
})
export class KafkaModule {}
