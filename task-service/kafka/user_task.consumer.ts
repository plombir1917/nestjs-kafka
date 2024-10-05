import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConsumerService } from './consumer.service';

@Injectable()
export class UserTaskConsumer implements OnModuleInit {
  constructor(private readonly kafka: ConsumerService) {}

  async onModuleInit() {
    await this.kafka.consume(
      { topic: 'user_task' },
      {
        eachMessage: async ({ message }) => {
          console.log(message.value.toString());
        },
      },
    );
  }
}
