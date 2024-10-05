import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { PrismaService } from 'prisma/prisma.service';
import { GraphQLModule } from '@nestjs/graphql';
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { GraphQLError, GraphQLFormattedError } from 'graphql';
import { UserResolver } from './user.resolver';
import { KafkaModule } from 'kafka/kafka.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: {
        federation: 2,
      },
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
  providers: [UserService, UserResolver, PrismaService],
})
export class UserModule {}
