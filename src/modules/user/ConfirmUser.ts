import { Resolver, Mutation, Arg } from 'type-graphql';
import { User } from '../../entity/User';
import { redisClient } from '../../redis';
import { confirmUserPrefix } from '../constants/redisPrefixes';

@Resolver()
export class ConfirmUserResolver {
  @Mutation(() => Boolean)
  async confirmUser(@Arg('token') token: string): Promise<boolean> {
    const userId = await redisClient.get(confirmUserPrefix + token);
    if (!userId) {
      return false;
    }

    await User.update({ id: parseInt(userId, 10) }, { confirmed: true });
    redisClient.del(confirmUserPrefix + token);

    return true;
  }
}
