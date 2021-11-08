import { IsString, IsUUID, MaxLength } from 'class-validator';

export class PersonUpdateDto {
	@IsString()
	@MaxLength(30)
	readonly name: string;
}
