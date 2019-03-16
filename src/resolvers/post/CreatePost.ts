import { Arg, Ctx, Mutation } from 'type-graphql';
import { Post } from '../../entity/Post';
import { Context } from '../../types/Context';
import { CreatePostInput } from './createPost/CreatePostInput';

export class CreatePostResolver {
  @Mutation(() => Post)
  async createPost(
    @Arg('data')
    { title, slug, content }: CreatePostInput,
    @Ctx() ctx: Context
  ): Promise<Post | null> {
    if (!ctx.req.session!.userId) {
      return null;
    }
    const post = await Post.create({
      title,
      slug,
      content,
      user: ctx.req.session!.userId
    }).save();

    return post;
  }
}
