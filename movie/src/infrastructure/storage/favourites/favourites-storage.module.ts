import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavouritesModel } from './favourites.model';
import { FavouritesStorageAdapter } from './favourites-storage.adapter';

@Module({
	imports: [TypeOrmModule.forFeature([FavouritesModel])],
	providers: [FavouritesStorageAdapter],
	exports: [FavouritesStorageAdapter],
})
export class FavouritesStorageModule {}
