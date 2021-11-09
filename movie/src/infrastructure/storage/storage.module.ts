import { Module } from '@nestjs/common';
import { GenresStorageModule } from './genres';
import { PersonsStorageModule } from './persons';
import { RolesStorageModule } from './roles';
import { MoviesStorageModule } from './movies';
import { FavouritesStorageModule } from './favourites';

@Module({
	imports: [
		GenresStorageModule,
		PersonsStorageModule,
		RolesStorageModule,
		MoviesStorageModule,
		FavouritesStorageModule,
	],
	exports: [
		GenresStorageModule,
		PersonsStorageModule,
		RolesStorageModule,
		MoviesStorageModule,
		FavouritesStorageModule,
	],
})
export class StorageModule {}
