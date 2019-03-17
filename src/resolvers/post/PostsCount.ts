import { Int, Query, Resolver } from 'type-graphql';
import { Post } from '../../entity/Post';

@Resolver(() => Post)
export class PostsCountQueryResolver {
  @Query(() => Int)
  async postsCount(): Promise<number | null> {
    const count = await Post.count({
      where: {
        deleted: false
      }
    });
    if (count) {
      return count;
    }
    return null;
  }
}
