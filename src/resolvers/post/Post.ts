import { Args, ArgsType, Field, Int, Query, Resolver } from 'type-graphql';
import { Post } from '../../entity/Post';

@ArgsType()
class PostArgs {
  @Field(_ => Int, { nullable: true })
  id?: number;

  @Field({ nullable: true })
  slug?: string;
}

@Resolver()
export class PostQueryResolver {
  @Query(() => Post)
  async post(@Args() { id, slug }: PostArgs): Promise<Post | undefined> {
    var post;
    if (id) {
      post = Post.findOne(id);
    } else if (slug) {
      post = Post.findOne({
        where: {
          slug
        }
      });
    }

    if (!post) {
      return undefined;
    }
    return post;
  }
}
