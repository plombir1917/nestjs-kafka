import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { GraphQLModule } from '@nestjs/graphql';
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { GraphQLError, GraphQLFormattedError } from 'graphql';
import { TaskResolver } from './task.resolver';
import { PrismaService } from 'prisma/prisma.service';
import { KafkaModule } from 'kafka/kafka.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: { federation: 2 },
      formatError: (error: GraphQLError) => {
        const formattedError: GraphQLFormattedError = {
          message: error.message,

          extensions: {
            ...error.extensions,
          },
        };
        delete formattedError.extensions.stacktrace;
        delete formattedError.extensions.originalError;

        return formattedError;
      },
    }),
    KafkaModule,
  ],
  providers: [TaskService, TaskResolver, PrismaService],
})
export class TaskModule {}
