import { IsUUID } from 'class-validator';

export class AddFavouriteDto {
	@IsUUID()
	readonly movieId: string;
}
