import { Module } from '@nestjs/common';
import { GenresModule } from './genres';
import { RolesModule } from './roles';
import { MoviesModule } from './movies';
import { PersonsModule } from './persons';

@Module({
	imports: [GenresModule, RolesModule, MoviesModule, PersonsModule],
	exports: [GenresModule, RolesModule, MoviesModule, PersonsModule],
})
export class CoreModule {}
