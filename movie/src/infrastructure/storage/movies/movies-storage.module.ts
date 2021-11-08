import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieModel } from './movie.model';
import { MoviesStorageAdapter } from './movies-storage.adapter';
import { PersonToFilmModel } from './person-to-film.model';

@Module({
	imports: [TypeOrmModule.forFeature([MovieModel, PersonToFilmModel])],
	providers: [MoviesStorageAdapter],
	exports: [MoviesStorageAdapter],
})
export class MoviesStorageModule {}
