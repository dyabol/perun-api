import { Args, ArgsType, Field, ID, Query, Resolver } from 'type-graphql';
import { Post, PostType } from '../../entity/Post';

@ArgsType()
class PostArgs {
  @Field(() => ID, { nullable: true })
  id?: number;

  @Field({ nullable: true })
  slug?: string;
}

@Resolver()
export class PostQueryResolver {
  @Query(() => Post, { nullable: true })
  async post(@Args() { id, slug }: PostArgs): Promise<Post | null> {
    var post;
    if (id) {
      post = await Post.findOne({
        where: {
          deleted: false,
          postType: PostType.POST,
          id
        }
      });
    } else if (slug) {
      post = await Post.findOne({
        where: {
          deleted: false,
          postType: PostType.POST,
          slug
        }
      });
    }

    if (!post) {
      return null;
    }
    return post;
  }

  @Query(() => Post, { nullable: true })
  async page(@Args() { id, slug }: PostArgs): Promise<Post | null> {
    var post;
    if (id) {
      post = await Post.findOne({
        where: {
          deleted: false,
          postType: PostType.PAGE,
          id
        }
      });
    } else if (slug) {
      post = await Post.findOne({
        where: {
          deleted: false,
          postType: PostType.PAGE,
          slug
        }
      });
    }

    if (!post) {
      return null;
    }
    return post;
  }
}
