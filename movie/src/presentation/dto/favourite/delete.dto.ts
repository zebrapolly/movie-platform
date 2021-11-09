import { IsUUID } from 'class-validator';

export class DeleteFavouriteDto {
	@IsUUID()
	readonly movieId: string;
}
