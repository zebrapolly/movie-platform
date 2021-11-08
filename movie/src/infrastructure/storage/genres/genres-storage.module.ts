import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GenreModel } from './genre.model';
import { GenresStorageAdapter } from './genres-storage.adapter';

@Module({
	imports: [TypeOrmModule.forFeature([GenreModel])],
	providers: [GenresStorageAdapter],
	exports: [GenresStorageAdapter],
})
export class GenresStorageModule {}
