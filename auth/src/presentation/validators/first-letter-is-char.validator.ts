import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

export function IsFirstLetterIsChar(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            name: 'isFirstLetterIsChar',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: {
                validate(value: any) {
                    const firstLetter = value?.charAt(0);
                    return firstLetter?.match(/[a-z]/i);
                },
            },
        });
    };
}