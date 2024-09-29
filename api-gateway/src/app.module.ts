import { IntrospectAndCompose, RemoteGraphQLDataSource } from '@apollo/gateway';
import { ApolloGatewayDriver, ApolloGatewayDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { GraphQLError, GraphQLFormattedError } from 'graphql';

//добавление заголовка авторизации к запросу
const handleAuth = ({ req }) => {
  if (req.headers.authorization) {
    return {
      authorization: `${req.headers.authorization}`,
    };
  }
};

//подграфы
const subgraphs = [
  {
    name: 'task',
    url: `http://localhost:3001/graphql`,
  },
  {
    name: 'user',
    url: `http://localhost:3002/graphql`,
  },
];

//проверка работсоспособности подграфа
const checkSubgraphsHealth = async (
  subgraphs: { name: string; url: string }[],
) => {
  const avalaibleSubgraphs = [];
  for (let i = 0; i < subgraphs.length; i++) {
    try {
      await fetch(subgraphs[i].url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      avalaibleSubgraphs.push(subgraphs[i]);
    } catch (error) {
      console.error(`Подграф ${subgraphs[i].name} недоступен`);
    }
  }
  return avalaibleSubgraphs;
};

@Module({
  imports: [
    GraphQLModule.forRootAsync<ApolloGatewayDriverConfig>({
      driver: ApolloGatewayDriver,
      useFactory: async () => ({
        server: {
          context: handleAuth,
          formatError: (error: GraphQLError) => {
            const formattedError: GraphQLFormattedError = {
              message: error.message,

              extensions: {
                ...error.extensions,
              },
            };
            delete formattedError.extensions.stacktrace;

            return formattedError;
          },
        },
        gateway: {
          buildService: ({ name, url }) => {
            return new RemoteGraphQLDataSource({
              url,
              willSendRequest({ request, context }) {
                request.http.headers.set(
                  'authorization',
                  context.authorization,
                );
              },
            });
          },
          supergraphSdl: new IntrospectAndCompose({
            subgraphs: await checkSubgraphsHealth(subgraphs),
          }),
        },
      }),
    }),
  ],
})
export class AppModule {}
