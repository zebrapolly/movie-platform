import { Module } from '@nestjs/common';
import { GenresStorageModule } from './genres';
import { PersonsStorageModule } from './persons';
import { RolesStorageModule } from './roles';
import { MoviesStorageModule } from './movies';

@Module({
	imports: [
		GenresStorageModule,
		PersonsStorageModule,
		RolesStorageModule,
		MoviesStorageModule,
	],
	exports: [
		GenresStorageModule,
		PersonsStorageModule,
		RolesStorageModule,
		MoviesStorageModule,
	],
})
export class StorageModule {}
