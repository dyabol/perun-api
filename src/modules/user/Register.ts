import {
  Resolver,
  Query,
  Mutation,
  Arg,
  //Authorized,
  UseMiddleware
} from 'type-graphql';
import bcrypt from 'bcryptjs';
import { User } from '../../entity/User';
import { RegisterInput } from './register/RegisterInput';
import { isAuth } from '../middleware/isAuth';
import { logger } from '../middleware/logger';
import { createConfirmationUrl } from '../utils/createConfirmationUrl';
import { sendEmail } from '../utils/sendEmail';

@Resolver()
export class RegisterResolver {
  //@Authorized()
  @UseMiddleware(isAuth, logger)
  @Query(() => String)
  async hello() {
    return 'Hello world!';
  }

  @Mutation(() => User)
  async register(@Arg('data')
  {
    firstName,
    lastName,
    email,
    password
  }: RegisterInput): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword
    }).save();

    await sendEmail(user.email, await createConfirmationUrl(user.id));

    return user;
  }
}
