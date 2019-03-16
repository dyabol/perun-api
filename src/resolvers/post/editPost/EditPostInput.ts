import { Length } from 'class-validator';
import { Field, ID, InputType } from 'type-graphql';
import { IsSlugValid } from '../shared/IsSlugValid';
import { IsSlugAlreadyExist } from './IsSlugAlreadyExist';

@InputType()
export class EditPostInput {
  @Field(() => ID)
  id: number;

  @Field()
  @Length(1, 255)
  title: string;

  @Field()
  @Length(1, 255)
  @IsSlugValid({
    message: 'Slug is not valid.'
  })
  @IsSlugAlreadyExist({
    message: 'Slug is already used.'
  })
  slug: string;

  @Field()
  content: string;
}
