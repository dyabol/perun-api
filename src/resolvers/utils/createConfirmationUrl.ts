import { v4 } from 'uuid';
import { CLIENT_URL } from '../../constants/server';
import { redisClient } from '../../redis';
import { confirmUserPrefix } from '../constants/redisPrefixes';
export const createConfirmationUrl = async (userId: number) => {
  const token = v4();
  redisClient.set(confirmUserPrefix + token, userId, 'ex', 60 * 60 * 24); // 1 day expiration

  return `${CLIENT_URL}/user/confirm/${token}`;
};
