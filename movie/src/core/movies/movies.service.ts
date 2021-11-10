import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { MovieSearchDto, MovieUpdateDto } from '../../presentation/dto';
import { MoviesStorageAdapter } from '../../infrastructure';
import { IMovieCreate, IMovieCreateInput, IMovieUpdate } from '../../domain';
import * as csv from 'fast-csv';
import { Readable } from 'stream';

@Injectable()
export class MoviesService {
	private readonly logger = new Logger(MoviesService.name);
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

	async getCSV() {
		const data = await this.moviesStorage.getAll();
		const csvStream = csv.write(data, { headers: true });
		return csvStream;
	}

	async importCSV(file, userId) {
		try {
			const data = await this.transformFile(file, userId);
			return await this.moviesStorage.createMultiple(data);
		} catch (err) {
			throw new BadRequestException(err.message);
		}
	}

	transformFile(file, userId) {
		return new Promise<IMovieCreate[]>((resolve, reject) => {
			let results = [];
			const stream = new Readable({
				encoding: 'utf-8',
				read() {
					this.push(file.buffer);
					this.push(null);
				},
			});
			let csvStream = csv
				.parse({ headers: true })
				.on('data', (data) => {
					const model: IMovieCreate = {
						...data,
						userId,
						releaseDate: new Date(data.releaseDate),
					};
					results.push(model);
				})
				.on('end', () => {
					resolve(results);
				})
				.on('error', (err) => {
					reject(new BadRequestException(err.message));
				});
			stream.pipe(csvStream);
		});
	}
}
