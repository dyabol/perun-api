import { createConnection } from 'typeorm';

export const testConnection = (drop: boolean = false) => {
  return createConnection({
    name: 'default',
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'typegraphql-test',
    synchronize: drop,
    dropSchema: drop,
    logging: false,
    entities: [__dirname + '/../entity/**/*.ts']
  });
};
