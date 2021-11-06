import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MovieModel } from "./movie.model";
import { IMovieCreate, IMovieSearch, IMovieUpdate } from "../../../domain";
import { PersonToFilmModel } from "./person-to-film.model";

@Injectable()
export class MoviesStorageAdapter {
    constructor(
        @InjectRepository(MovieModel)
        private movieRepository: Repository<MovieModel>,
        @InjectRepository(PersonToFilmModel)
        private personsToFilmRepository: Repository<PersonToFilmModel>
    ) {}

    findById(id: string) {
        return this.movieRepository.findOne({ id }, { relations: ['people', 'people.person', 'people.role', 'genres']});
    }

    search(params: IMovieSearch) {
        return this.movieRepository.find({ where: params });
    }

    async create(payload: IMovieCreate) {
        return this.movieRepository.save(payload);
    }

    async update(id: string, payload: IMovieUpdate) {
        if (payload.people) {
            await this.personsToFilmRepository.createQueryBuilder()
                .delete()
                .from(PersonToFilmModel)
                .where("movie_id = :id", { id })
                .execute();
        }
        return this.movieRepository.save({ id, ...payload });
    }

    async delete(id: string) {
        return this.movieRepository.save({ id, isDeleted: true });
    }

    async restore(id: string) {
        return this.movieRepository.save({ id, isDeleted: false });
    }
}
