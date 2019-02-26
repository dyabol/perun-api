import {
  Resolver,
  Query,
  Mutation,
  Arg,
  FieldResolver,
  Root
} from 'type-graphql';
import * as bcrypt from 'bcrypt';
import { User } from '../../entity/User';

@Resolver(User)
export class RegisterResolver {
  @Query(() => String)
  async hello() {
    return 'Hello world!';
  }

  @FieldResolver()
  async fullName(@Root() parent: User) {
    return `${parent.firstName} ${parent.lastName}`;
  }

  @Mutation(() => User)
  async register(
    @Arg('firstName') firstName: string,
    @Arg('lastName') lastName: string,
    @Arg('email') email: string,
    @Arg('password') password: string
  ): Promise<User> {
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
