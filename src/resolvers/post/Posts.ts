import { FieldResolver, Query, Resolver, Root } from 'type-graphql';
import { Post } from '../../entity/Post';
import { User } from '../../entity/User';

@Resolver(() => Post)
export class PostsQueryResolver {
  @Query(() => [Post])
  async posts(): Promise<Post[] | null> {
    return Post.find();
  }

  @FieldResolver()
  async user(@Root() post: Post): Promise<User | null> {
    const user = await User.findOne(post.user);
    if (!user) {
      return null;
    }
    return user;
  }
}
