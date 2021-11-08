import { IsOptional, IsString } from 'class-validator';

export class RoleSearchDto {
	@IsOptional()
	@IsString()
	readonly name: string;
}
