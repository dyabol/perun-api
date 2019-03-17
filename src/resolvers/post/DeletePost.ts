import { Arg, ID, Mutation, UseMiddleware } from 'type-graphql';
import { Post } from '../../entity/Post';
import { isAuth } from '../middleware/isAuth';

export class DeletePostResolver {
  @UseMiddleware(isAuth)
  @Mutation(() => Boolean)
  async deletePost(
    @Arg('id', _ => ID)
    id: number
  ): Promise<boolean> {
    await Post.update({ id }, { deleted: true });
    return true;
  }
}
