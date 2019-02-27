import { v4 } from 'uuid';
import { redisClient } from '../../redis';
import { CLIENT_URL } from '../../index';
export const createConfirmationUrl = async (userId: number) => {
  const token = v4();
  redisClient.set(token, userId, 'ex', 60 * 60 * 24); // 1 day expiration

  return `${CLIENT_URL}/user/confirm/${token}`;
};
