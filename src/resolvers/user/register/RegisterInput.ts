import { IsEmail, Length } from 'class-validator';
import { Field, InputType } from 'type-graphql';
import { PasswordMixin } from '../shared/PasswordInput';
import { IsEmailAlreadyExist } from './IsEmailAlreadyExist';

@InputType()
export class RegisterInput extends PasswordMixin(class {}) {
  @Field()
  @Length(1, 255)
  firstName: string;

  @Field()
  @Length(1, 255)
  lastName: string;

  @Field()
  @IsEmail()
  @IsEmailAlreadyExist({
    message: 'Email is already used.'
  })
  email: string;
}
