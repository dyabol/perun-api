import { Resolver, Mutation, Arg } from 'type-graphql';
import { User } from '../../entity/User';
import { sendEmail } from '../utils/sendEmail';
import { createChangePasswordUrl } from '../utils/createChangePasswordUrl';

@Resolver()
export class ForgotPasswordResolver {
  @Mutation(() => Boolean)
  async forgorPassword(@Arg('email') email: string): Promise<boolean> {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return false;
    }

    await sendEmail(email, await createChangePasswordUrl(user.id));

    return true;
  }
}
