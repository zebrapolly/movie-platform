import { IsString } from 'class-validator';

export class People {
	@IsString()
	readonly roleId: string;

	@IsString()
	readonly personId: string;
}
