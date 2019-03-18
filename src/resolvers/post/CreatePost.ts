import { Arg, Ctx, Mutation, UseMiddleware } from 'type-graphql';
import { Post, PostType } from '../../entity/Post';
import { Context } from '../../types/Context';
import { isAuth } from '../middleware/isAuth';
import { CreatePostInput } from './createPost/CreatePostInput';

export class CreatePostResolver {
  @UseMiddleware(isAuth)
  @Mutation(() => Post)
  async createPost(
    @Arg('data')
    { title, slug, content }: CreatePostInput,
    @Ctx() ctx: Context
  ): Promise<Post | null> {
    const post = await Post.create({
      title,
      slug,
      content,
      postType: PostType.POST,
      user: ctx.req.session!.userId
    }).save();

    return post;
  }

  @UseMiddleware(isAuth)
  @Mutation(() => Post)
  async createPage(
    @Arg('data')
    { title, slug, content }: CreatePostInput,
    @Ctx() ctx: Context
  ): Promise<Post | null> {
    const post = await Post.create({
      title,
      slug,
      content,
      postType: PostType.PAGE,
      user: ctx.req.session!.userId
    }).save();

    return post;
  }
}
