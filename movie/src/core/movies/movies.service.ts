import { Injectable } from '@nestjs/common';
import { MovieSearchDto, MovieUpdateDto } from '../../presentation/dto';
import { MoviesStorageAdapter } from '../../infrastructure';
import { IMovieCreate, IMovieCreateInput, IMovieUpdate } from '../../domain';

@Injectable()
export class MoviesService {
	constructor(private readonly moviesStorage: MoviesStorageAdapter) {}
	create(payload: IMovieCreateInput) {
		const model: IMovieCreate = {
			title: payload.title,
			synopsis: payload.synopsis,
			releaseDate: new Date(payload.releaseDate),
			genres: payload.genres,
			people: payload.people.map((item) => ({
				role: { id: item.roleId },
				person: { id: item.personId },
			})),
			userId: payload.userId,
		};
		return this.moviesStorage.create(model);
	}

	findAll(params: MovieSearchDto) {
		const model = {
			title: params.title,
			genre: params.genre,
			releaseDateAfter: params.releaseDateAfter
				? new Date(params.releaseDateAfter)
				: undefined,
			releaseDateBefore: params.releaseDateBefore
				? new Date(params.releaseDateBefore)
				: undefined,
		};
		return this.moviesStorage.search(model);
	}

	findOne(id: string) {
		return this.moviesStorage.findById(id);
	}

	update(id: string, updateMovieDto: MovieUpdateDto) {
		const model: IMovieUpdate = {
			title: updateMovieDto.title || undefined,
			synopsis: updateMovieDto.synopsis || undefined,
			releaseDate: updateMovieDto.releaseDate
				? new Date(updateMovieDto.releaseDate)
				: undefined,
			genres: updateMovieDto.genres || undefined,
			people: updateMovieDto?.people.map((item) => ({
				role: { id: item.roleId },
				person: { id: item.personId },
			})),
		};
		return this.moviesStorage.update(id, model);
	}

	remove(id: string) {
		return this.moviesStorage.delete(id);
	}
}
