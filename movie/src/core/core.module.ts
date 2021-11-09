import { Module } from '@nestjs/common';
import { GenresModule } from './genres';
import { RolesModule } from './roles';
import { MoviesModule } from './movies';
import { PersonsModule } from './persons';
import { FavouritesModule } from './favourites';

@Module({
	imports: [
		GenresModule,
		RolesModule,
		MoviesModule,
		PersonsModule,
		FavouritesModule,
	],
	exports: [
		GenresModule,
		RolesModule,
		MoviesModule,
		PersonsModule,
		FavouritesModule,
	],
})
export class CoreModule {}
