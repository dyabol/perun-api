import { Length } from 'class-validator';
import { Field, InputType } from 'type-graphql';
import { IsSlugAlreadyExist } from './IsSlugAlreadyExist';

@InputType()
export class CreatePostInput {
  @Field()
  @Length(1, 255)
  title: string;

  @Field()
  @Length(1, 255)
  @IsSlugAlreadyExist({
    message: 'Slug is already used.'
  })
  slug: string;

  @Field()
  content: string;
}
