import { IsString, MaxLength } from 'class-validator';

export class GenreCreateDto {
	@IsString()
	@MaxLength(100)
	readonly name: string;
}
