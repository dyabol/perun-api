import { ApolloServer } from 'apollo-server-express';
import connectRedis from 'connect-redis';
import cors from 'cors';
import Express from 'express';
import session from 'express-session';
import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { CLIENT_URL, SERVER_URL, SERVE_PORT } from './constants/server';
import { redisClient } from './redis';
import { createSchema } from './utils/createSchema';

const main = async () => {
  await createConnection();

  const schema = await createSchema();

  const apolloServer = new ApolloServer({
    schema,
    context: ({ req, res }: any) => ({ req, res })
  });

  const app = Express();

  const RedisStore = connectRedis(session);

  app.use(
    cors({
      credentials: true,
      origin: CLIENT_URL
    })
  );

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

  apolloServer.applyMiddleware({ app, cors: false });

  app.listen(SERVE_PORT, () => {
    console.log(`Server listen on ${SERVER_URL}/graphql`);
  });
};

main().catch(err => console.error(err));
