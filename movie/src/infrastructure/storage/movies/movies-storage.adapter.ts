import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MovieModel } from './movie.model';
import { IMovieCreate, IMovieSearch, IMovieUpdate } from '../../../domain';
import { PersonToFilmModel } from './person-to-film.model';

@Injectable()
export class MoviesStorageAdapter {
	constructor(
		@InjectRepository(MovieModel)
		private movieRepository: Repository<MovieModel>,
		@InjectRepository(PersonToFilmModel)
		private personsToFilmRepository: Repository<PersonToFilmModel>,
	) {}

	findById(id: string) {
		return this.movieRepository.findOne(
			{ id },
			{ relations: ['people', 'people.person', 'people.role', 'genres'] },
		);
	}

	async search(params: IMovieSearch) {
		const query = await this.movieRepository
			.createQueryBuilder('movie')
			.select();
		if (params.title) {
			query.andWhere("upper(title) LIKE upper('%' || :title || '%')", {
				title: params.title,
			});
		}
		if (params.genre) {
			query
				.leftJoin('movie.genres', 'genres')
				.andWhere("upper(genres.name) LIKE upper('%' || :genre || '%')", {
					genre: params.genre,
				});
		}
		if (params.releaseDateBefore) {
			query.andWhere('movie.release_date < :before', {
				before: params.releaseDateBefore,
			});
		}
		if (params.releaseDateAfter) {
			query.andWhere('movie.release_date > :after', {
				after: params.releaseDateAfter,
			});
		}
		return query.getMany();
	}

	async create(payload: IMovieCreate) {
		return this.movieRepository.save(payload);
	}

	createMultiple(payload: IMovieCreate[]) {
		return this.movieRepository.save(payload);
	}

	async update(id: string, payload: IMovieUpdate) {
		if (payload.people) {
			await this.personsToFilmRepository
				.createQueryBuilder()
				.delete()
				.from(PersonToFilmModel)
				.where('movie_id = :id', { id })
				.execute();
		}
		return this.movieRepository.save({ id, ...payload });
	}

	async delete(id: string) {
		return this.movieRepository.save({ id, isDeleted: true });
	}

	getAll() {
		return this.movieRepository.find({});
	}

	async restore(id: string) {
		return this.movieRepository.save({ id, isDeleted: false });
	}
}
