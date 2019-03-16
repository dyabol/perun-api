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
  validate(slug: string) {
    return Post.findOne({
      where: {
        slug
      }
    }).then(post => {
      if (post) return false;
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
