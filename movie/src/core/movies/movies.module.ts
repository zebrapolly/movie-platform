import { Module } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { InfrastructureModule } from '../../infrastructure';

@Module({
	imports: [InfrastructureModule],
	providers: [MoviesService],
	exports: [MoviesService],
})
export class MoviesModule {}
