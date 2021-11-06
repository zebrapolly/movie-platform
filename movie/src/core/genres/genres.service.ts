import { Injectable } from '@nestjs/common';
import { GenreCreateDto, GenreUpdateDto, SearchGenreDto } from "../../presentation/dto";
import { GenresStorageAdapter } from "../../infrastructure";

@Injectable()
export class GenresService {
  constructor(
      private readonly genreStorage: GenresStorageAdapter
  ) {
  }
  create(createGenreDto: GenreCreateDto) {
    return this.genreStorage.create(createGenreDto);
  }

  findAll(params: SearchGenreDto) {
    return this.genreStorage.search(params);
  }

  findOne(id: string) {
    return this.genreStorage.findById(id);
  }

  update(id: string, updateGenreDto: GenreUpdateDto) {
    return this.genreStorage.update(id, updateGenreDto)
  }

  remove(id: string) {
    return this.genreStorage.delete(id);
  }
}
