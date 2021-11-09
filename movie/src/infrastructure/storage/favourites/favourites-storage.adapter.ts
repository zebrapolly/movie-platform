import { InjectRepository } from '@nestjs/typeorm';
import { FavouritesModel } from './favourites.model';
import { Repository } from 'typeorm';
import {
	IAddToFavouritesInput,
	IDeleteFromFavouritesInput,
} from '../../../domain';

export class FavouritesStorageAdapter {
	constructor(
		@InjectRepository(FavouritesModel)
		private genreRepository: Repository<FavouritesModel>,
	) {}
	async add(payload: IAddToFavouritesInput) {
		const { userId, movieId } = payload;
		try {
			return await this.genreRepository.save({ userId, movieId }, {});
		} catch (error) {
			if (error.code === '23505') {
				return this.genreRepository.findOne({ userId, movieId });
			}
			throw error;
		}
	}
	get(userId: string) {
		return this.genreRepository.find({
			where: { userId },
			relations: ['movie'],
		});
	}
	delete(payload: IDeleteFromFavouritesInput) {
		return this.genreRepository.delete({ ...payload });
	}
}
