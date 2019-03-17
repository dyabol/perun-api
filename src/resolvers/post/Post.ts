import { Args, ArgsType, Field, ID, Query, Resolver } from 'type-graphql';
import { Post } from '../../entity/Post';

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
          id
        }
      });
    } else if (slug) {
      post = await Post.findOne({
        where: {
          deleted: false,
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
