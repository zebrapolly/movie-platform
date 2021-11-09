import { Module } from '@nestjs/common';
import { GenresController } from './genres.controller';
import { MoviesController } from './movies.controller';
import { RolesController } from './roles.controller';
import { PersonsController } from './persons.controller';
import { CoreModule } from '../core';
import jwtConfig from '../config/jwt.config';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { BlStorageModule } from '../infrastructure';
import { FavouritesController } from './favorites.controller';

@Module({
	controllers: [
		FavouritesController,
		GenresController,
		MoviesController,
		RolesController,
		PersonsController,
	],
	providers: [JwtStrategy],
	imports: [CoreModule, BlStorageModule, JwtModule.register(jwtConfig())],
})
export class PresentationModule {}
