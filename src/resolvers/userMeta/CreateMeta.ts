import { Length } from 'class-validator';
import { Field, ID, InputType } from 'type-graphql';
import { UserMeta } from '../../entity/UserMeta';
import { createResolver } from '../shared/CreateResolver';

@InputType()
class UserMetaInput {
  @Field()
  @Length(1, 255)
  key: string;
  @Field()
  value: string;
  @Field(() => ID)
  userId: number;
}

export const CreateUserMetaResolver = createResolver(
  'UserMeta',
  UserMeta,
  UserMetaInput,
  UserMeta
);
