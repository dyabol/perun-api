import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface
} from 'class-validator';

@ValidatorConstraint({ async: true })
export class IsSlugValidConstraint implements ValidatorConstraintInterface {
  validate(slug: string) {
    return /^[A-Za-z0-9]+(?:-[A-Za-z0-9]+)*$/.test(slug);
  }
}

export function IsSlugValid(validationOptions?: ValidationOptions) {
  return function(object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsSlugValidConstraint
    });
  };
}
