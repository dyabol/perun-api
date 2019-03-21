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
  @Query(() => User, { nullable: true })
  async user(@Args() { id, email }: UserArgs): Promise<User | null> {
    var user;
    if (id) {
      user = await User.findOne(id);
    } else if (email) {
      user = await User.findOne({
        where: {
          email
        }
      });
    }
    if (!user) {
      return null;
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

  @FieldResolver()
  async avatar(@Root() user: User): Promise<string | null> {
    var fs = require('fs');
    const ext = 'jpg';
    if (
      fs.existsSync(__dirname + `/../../../public/avatars/${user.id}.${ext}`)
    ) {
      return `${process.env.DOMAIN}:${process.env.PORT}/static/avatars/${
        user.id
      }.${ext}`;
    }
    return null;
  }
}
