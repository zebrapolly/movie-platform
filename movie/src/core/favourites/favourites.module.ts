import { Module } from '@nestjs/common';
import { FavouritesService } from './favourites.service';
import { InfrastructureModule } from '../../infrastructure';

@Module({
	imports: [InfrastructureModule],
	providers: [FavouritesService],
	exports: [FavouritesService],
})
export class FavouritesModule {}
