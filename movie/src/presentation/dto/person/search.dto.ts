import { IsOptional, IsString } from 'class-validator';

export class PersonSearchDto {
	@IsOptional()
	@IsString()
	readonly name: string;
}
