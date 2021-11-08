import { IsString, MaxLength } from 'class-validator';

export class RoleCreateDto {
	@IsString()
	@MaxLength(30)
	readonly name: string;
}
