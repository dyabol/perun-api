import { Arg, ID, Mutation, UseMiddleware } from 'type-graphql';
import { Post, PostType } from '../../entity/Post';
import { isAuth } from '../middleware/isAuth';

export class DeletePostResolver {
  @UseMiddleware(isAuth)
  @Mutation(() => Boolean)
  async deletePost(
    @Arg('id', _ => ID)
    id: number
  ): Promise<boolean> {
    await Post.update({ id, postType: PostType.POST }, { deleted: true });
    return true;
  }

  @UseMiddleware(isAuth)
  @Mutation(() => Boolean)
  async deletePage(
    @Arg('id', _ => ID)
    id: number
  ): Promise<boolean> {
    await Post.update({ id, postType: PostType.PAGE }, { deleted: true });
    return true;
  }
}
