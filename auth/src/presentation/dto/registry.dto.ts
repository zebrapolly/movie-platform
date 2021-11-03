import { IsString, Length, MaxLength, MinLength } from 'class-validator';
import { IsFirstLetterIsChar } from '../validators';
import { IRegisterUser } from "../../domain";

export class RegisterDto implements IRegisterUser {
    @IsString()
    @IsFirstLetterIsChar({ message: 'username must start from letter' })
    username: string;

    @IsString()
    @MinLength(4, {
        message: 'password must be more than 4 characters',
    })
    @MaxLength(10, {
        message: 'password must be less than 10 characters',
    })
    password: string;
}