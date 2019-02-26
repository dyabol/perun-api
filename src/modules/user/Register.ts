import { Resolver, Query, Mutation, Arg } from 'type-graphql';
import bcrypt from 'bcrypt';
import { User } from '../../entity/User';
import { RegisterInput } from './register/RegisterInput';

@Resolver()
export class RegisterResolver {
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
    //TODO: salt precist si
    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword
    }).save();

    return user;
  }
}
