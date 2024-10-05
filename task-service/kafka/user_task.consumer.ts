import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConsumerService } from './consumer.service';
import { TaskService } from 'src/task.service';

@Injectable()
export class UserTaskConsumer implements OnModuleInit {
  constructor(
    private readonly kafka: ConsumerService,
    private readonly taskService: TaskService,
  ) {}

  async onModuleInit() {
    await this.kafka.consume(
      { topic: 'user_task' },
      {
        eachMessage: async ({ message }) => {
          await this.taskService.createUserTask(
            JSON.parse(message.value.toString()),
          );
        },
      },
    );
  }
}
