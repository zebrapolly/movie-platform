import { IsDateString, IsOptional, IsString } from 'class-validator';

export class MovieSearchDto {
	@IsOptional()
	@IsString()
	readonly title: string;

	@IsOptional()
	@IsDateString()
	readonly releaseDateBefore: string;

	@IsOptional()
	@IsDateString()
	readonly releaseDateAfter: string;

	@IsOptional()
	@IsString()
	readonly genre: string;
}
