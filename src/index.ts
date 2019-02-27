import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-express';
import { createConnection } from 'typeorm';
import Express from 'express';
import session from 'express-session';
import cors from 'cors';
import { buildSchema } from 'type-graphql';
import { RegisterResolver } from './modules/user/Register';
import connectRedis from 'connect-redis';
import { redisClient } from './redis';
import { LoginResolver } from './modules/user/Login';
import { MeResolver } from './modules/user/Me';

export const SERVE_PORT: number = 4000;
export const CLIENT_PORT: number = 3000;

export const SERVER_URL: string = `http://localhost:${SERVE_PORT}`;
export const CLIENT_URL: string = `http://localhost:${CLIENT_PORT}`;

const main = async () => {
  await createConnection();

  const schema = await buildSchema({
    resolvers: [RegisterResolver, LoginResolver, MeResolver]
  });

  const apolloServer = new ApolloServer({
    schema,
    context: ({ req }: any) => ({ req })
  });

  const app = Express();

  app.use(
    cors({
      credentials: true,
      origin: CLIENT_URL
    })
  );

  const RedisStore = connectRedis(session);

  app.use(
    session({
      store: new RedisStore({
        client: redisClient as any
      }),
      name: 'qid',
      secret: 'b52dfsbqpomp2b6arg',
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 1000 * 60 * 60 * 24 * 7 * 365 // 7 years
      }
    })
  );

  apolloServer.applyMiddleware({ app });

  app.listen(SERVE_PORT, () => {
    console.log(`Server listen on ${SERVER_URL}/graphql`);
  });
};

main();
