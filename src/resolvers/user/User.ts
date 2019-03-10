import {
  Args,
  ArgsType,
  Field,
  FieldResolver,
  Int,
  Query,
  Resolver,
  Root
} from 'type-graphql';
import { Post } from '../../entity/Post';
import { User } from '../../entity/User';

@ArgsType()
class UserArgs {
  @Field(_ => Int, { nullable: true })
  id?: number;

  @Field({ nullable: true })
  email?: string;
}

@Resolver(() => User)
export class UserQueryResolver {
  @Query(() => User)
  async user(@Args() { id, email }: UserArgs): Promise<User | undefined> {
    var user;
    if (id) {
      user = User.findOne(id);
    } else if (email) {
      user = User.findOne({
        where: {
          email
        }
      });
    }
    if (!user) {
      return undefined;
    }
    return user;
  }

  @FieldResolver()
  async posts(@Root() user: User): Promise<Post[] | null> {
    const posts = await Post.find({
      where: {
        userId: user.id
      }
    });
    if (!posts) {
      return null;
    }
    return posts;
  }
}
