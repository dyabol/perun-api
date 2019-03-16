import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface
} from 'class-validator';
import { Post } from '../../../entity/Post';

@ValidatorConstraint({ async: true })
export class IsSlugAlreadyExistConstraint
  implements ValidatorConstraintInterface {
  validate(slug: string, args: any) {
    return Post.findOne({
      where: {
        slug
      }
    }).then((post: any) => {
      if (post && post.id != args.object.id) return false;
      return true;
    });
  }
}

export function IsSlugAlreadyExist(validationOptions?: ValidationOptions) {
  return function(object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsSlugAlreadyExistConstraint
    });
  };
}
