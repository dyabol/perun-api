import { Int, Query, Resolver } from 'type-graphql';
import { Post, PostType } from '../../entity/Post';

@Resolver(() => Post)
export class PostsCountQueryResolver {
  @Query(() => Int)
  async postsCount(): Promise<number> {
    const count = await Post.count({
      where: {
        deleted: false,
        postType: PostType.POST
      }
    });
    if (count) {
      return count;
    }
    return 0;
  }

  @Query(() => Int)
  async pagesCount(): Promise<number> {
    const count = await Post.count({
      where: {
        deleted: false,
        postType: PostType.PAGE
      }
    });
    if (count) {
      return count;
    }
    return 0;
  }
}
