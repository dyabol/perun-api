import { Arg, Mutation, Resolver, UseMiddleware } from 'type-graphql';
import { Post, PostType } from '../../entity/Post';
import { isAuth } from '../middleware/isAuth';
import { EditPostInput } from './editPost/EditPostInput';

@Resolver()
export class EditPostResolver {
  @UseMiddleware(isAuth)
  @Mutation(() => Post)
  async editPost(@Arg('data')
  {
    id,
    title,
    slug,
    content
  }: EditPostInput): Promise<Post | null> {
    let post = await Post.findOne({ id, postType: PostType.POST });
    if (!post) {
      return null;
    }
    post.title = title;
    post.slug = slug;
    post.content = content;
    post = await Post.save(post);
    return post;
  }

  @UseMiddleware(isAuth)
  @Mutation(() => Post)
  async editPage(@Arg('data')
  {
    id,
    title,
    slug,
    content
  }: EditPostInput): Promise<Post | null> {
    let post = await Post.findOne({ id, postType: PostType.PAGE });
    if (!post) {
      return null;
    }
    post.title = title;
    post.slug = slug;
    post.content = content;
    post = await Post.save(post);
    return post;
  }
}
