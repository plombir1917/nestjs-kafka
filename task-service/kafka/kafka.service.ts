import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class KafkaService {
  constructor(
    @Inject('task-service') private readonly kafkaClient: ClientKafka,
  ) {}

  async onModuleInit() {
    this.kafkaClient.subscribeToResponseOf('create-user-task');
    await this.kafkaClient.connect();
  }

  sendMessage(message: string) {
    return this.kafkaClient.send('create-user-task', { message });
  }
}
