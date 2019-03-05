import { Arg, FieldResolver, Query, Resolver, Root } from 'type-graphql';
import { Post } from '../../entity/Post';
import { User } from '../../entity/User';

@Resolver(() => User)
export class UserQueryResolver {
  @Query(() => User)
  async user(@Arg('id') id: number): Promise<User | undefined> {
    const user = User.findOne(id);
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
