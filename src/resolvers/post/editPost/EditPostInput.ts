import { Length } from 'class-validator';
import { Field, ID, InputType } from 'type-graphql';

@InputType()
export class EditPostInput {
  @Field(() => ID)
  id: number;

  @Field()
  @Length(1, 255)
  title: string;

  @Field()
  @Length(1, 255)
  slug: string;

  @Field()
  content: string;
}
