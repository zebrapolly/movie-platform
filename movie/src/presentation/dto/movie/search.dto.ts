import { IsOptional, IsString } from 'class-validator';

export class MovieSearchDto {
	@IsOptional()
	@IsString()
	readonly name: string;
}
