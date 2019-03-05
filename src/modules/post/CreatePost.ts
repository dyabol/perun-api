import { Field, InputType } from 'type-graphql';
import { Post } from '../../entity/Post';
import { createResolver } from '../shared/CreateResolver';

@InputType()
class PostInput {
  @Field()
  title: string;
  @Field()
  content: string;
  @Field()
  user: number;
}

export const CreatePostResolver = createResolver('Post', Post, PostInput, Post);
