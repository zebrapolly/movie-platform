import { Injectable } from '@nestjs/common';
import {
	IAddToFavouritesInput,
	IDeleteFromFavouritesInput,
} from '../../domain';
import { FavouritesStorageAdapter } from '../../infrastructure';

@Injectable()
export class FavouritesService {
	constructor(private readonly favouritesStorage: FavouritesStorageAdapter) {}
	add(payload: IAddToFavouritesInput) {
		return this.favouritesStorage.add(payload);
	}
	get(userId: string) {
		return this.favouritesStorage.get(userId);
	}
	delete(payload: IDeleteFromFavouritesInput) {
		return this.favouritesStorage.delete(payload);
	}
}
