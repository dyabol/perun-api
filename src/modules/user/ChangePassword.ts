import { Resolver, Mutation, Arg, Ctx } from 'type-graphql';
import { User } from '../../entity/User';
import { ChangePasswordInput } from './changePassword/changePasswordIput';
import { redisClient } from '../../redis';
import { forgotPasswordPrefix } from '../constants/redisPrefixes';
import { hashPassword } from '../utils/hashPassword';
import { Context } from '../../types/Context';

@Resolver()
export class ChangePasswordResolver {
  @Mutation(() => User, { nullable: true })
  async changePassword(
    @Arg('data')
    { token, password }: ChangePasswordInput,
    @Ctx() ctx: Context
  ): Promise<User | null> {
    const userId = await redisClient.get(forgotPasswordPrefix + token);

    if (!userId) {
      return null;
    }

    const user = await User.findOne(userId);

    if (!user) {
      return null;
    }

    await redisClient.del(forgotPasswordPrefix + token);

    user.password = await hashPassword(password);

    user.save();

    ctx.req.session!.userId = user.id;

    return user;
  }
}
