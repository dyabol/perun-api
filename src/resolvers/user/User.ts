import {
  Args,
  ArgsType,
  Field,
  FieldResolver,
  ID,
  Query,
  Resolver,
  Root
} from 'type-graphql';
import { In } from 'typeorm';
import { Post } from '../../entity/Post';
import { User } from '../../entity/User';
import { UserMeta } from '../../entity/UserMeta';

@ArgsType()
class UserArgs {
  @Field(() => ID, { nullable: true })
  id?: number;

  @Field({ nullable: true })
  email?: string;
}

@ArgsType()
class MetaArgs {
  @Field(() => [String], { nullable: true })
  keys?: string[];
}

@Resolver(() => User)
export class UserQueryResolver {
  @Query(() => User)
  async user(@Args() { id, email }: UserArgs): Promise<User | undefined> {
    var user;
    if (id) {
      user = User.findOne(id);
    } else if (email) {
      user = User.findOne({
        where: {
          email
        }
      });
    }
    if (!user) {
      return undefined;
    }
    return user;
  }

  @FieldResolver()
  async posts(@Root() user: User): Promise<Post[] | null> {
    const posts = await Post.find({
      where: {
        userId: user.id
      }
    });
    if (!posts) {
      return null;
    }
    return posts;
  }

  @FieldResolver()
  async meta(
    @Root() user: User,
    @Args() { keys }: MetaArgs
  ): Promise<UserMeta[] | null> {
    var meta;
    if (keys && keys.length > 0) {
      meta = await UserMeta.find({
        where: {
          userId: user.id,
          key: In(keys)
        }
      });
    } else {
      meta = await UserMeta.find({
        where: {
          userId: user.id
        }
      });
    }
    if (!meta) {
      return null;
    }
    return meta;
  }
}
