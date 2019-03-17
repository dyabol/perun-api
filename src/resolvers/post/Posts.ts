import { Arg, FieldResolver, Int, Query, Resolver, Root } from 'type-graphql';
import { Post } from '../../entity/Post';
import { User } from '../../entity/User';

@Resolver(() => Post)
export class PostsQueryResolver {
  @Query(() => [Post])
  async posts(
    @Arg('take', _ => Int, { nullable: true }) take?: number,
    @Arg('skip', _ => Int, { nullable: true }) skip?: number
    //@Arg('order', type => Int ) order?: { [P in keyof Post]?: 'ASC' | 'DESC' | 1 | -1 }
  ): Promise<Post[] | null> {
    return Post.find({
      where: {
        deleted: false
      },
      order: {
        //order: order || {
        createdAt: 'DESC'
      },
      skip,
      take
    });
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
