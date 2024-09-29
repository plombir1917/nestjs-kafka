import { ClientProviderOptions, Transport } from '@nestjs/microservices';

export const kafkaConfig: ClientProviderOptions = {
  name: 'TASK_SERVICE',
  transport: Transport.KAFKA,
  options: {
    client: {
      clientId: 'task-service',
      brokers: ['localhost:9092'],
    },
    consumer: {
      groupId: 'task-service-consumer',
    },
  },
};
