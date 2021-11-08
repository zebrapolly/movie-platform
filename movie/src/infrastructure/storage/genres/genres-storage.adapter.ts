import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GenreModel } from './genre.model';
import { IGenreCreate, IGenreSearch, IGenreUpdate } from '../../../domain';

@Injectable()
export class GenresStorageAdapter {
	constructor(
		@InjectRepository(GenreModel)
		private genreRepository: Repository<GenreModel>,
	) {}

	findById(id: string) {
		return this.genreRepository.findOne({ id });
	}

	search(params: IGenreSearch) {
		return this.genreRepository.find({ where: params });
	}

	async create(payload: IGenreCreate) {
		return this.genreRepository.save(payload);
	}

	async update(id: string, payload: IGenreUpdate) {
		return this.genreRepository.save({ id, ...payload });
	}

	async delete(id: string) {
		return this.genreRepository.save({ id, isDeleted: true });
	}

	async restore(id: string) {
		return this.genreRepository.save({ id, isDeleted: false });
	}
}
