import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-express';
import * as Express from 'express';
import { buildSchema } from 'type-graphql';
import { createConnection } from 'typeorm';
import { RegisterResolver } from './modules/user/Register';

const main = async () => {
  await createConnection();

  const schema = await buildSchema({
    resolvers: [RegisterResolver]
  });

  const apolloServer = new ApolloServer({ schema });

  const app = Express();
  const port = 4000;

  apolloServer.applyMiddleware({ app });

  app.listen(port, () => {
    console.log(`Server listen on http://localhost:${port}/graphql`);
  });
};

main();
