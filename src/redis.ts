import Redis from 'ioredis';

export const redisClient = new Redis();

redisClient.on('error', function(err) {
  console.log('Redis error: ' + err);
});

redisClient.on('ready', function() {
  console.log('Redis is ready');
});
