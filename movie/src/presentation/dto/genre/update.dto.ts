import { IsString, MaxLength } from 'class-validator';

export class GenreUpdateDto {
	@IsString()
	@MaxLength(30)
	readonly name: string;
}
