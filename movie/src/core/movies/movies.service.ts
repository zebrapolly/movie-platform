import { Injectable } from '@nestjs/common';
import { MovieCreateDto, MovieUpdateDto } from '../../presentation/dto';
import { MoviesStorageAdapter } from '../../infrastructure';
import { IMovieCreate, IMovieUpdate } from '../../domain';

@Injectable()
export class MoviesService {
	constructor(private readonly moviesStorage: MoviesStorageAdapter) {}
	create(createMovieDto: MovieCreateDto) {
		const model: IMovieCreate = {
			title: createMovieDto.title,
			synopsis: createMovieDto.synopsis,
			releaseDate: new Date(createMovieDto.releaseDate),
			genres: createMovieDto.genres,
			people: createMovieDto.people.map((item) => ({
				role: { id: item.roleId },
				person: { id: item.personId },
			})),
		};
		return this.moviesStorage.create(model);
	}

	findAll() {
		return this.moviesStorage.search({});
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
