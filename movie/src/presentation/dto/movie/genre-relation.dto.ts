import { IsUUID } from 'class-validator';

export class GenreRelation {
	@IsUUID()
	id: string;
}
