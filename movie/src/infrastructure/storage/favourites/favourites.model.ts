import {
	Column,
	Entity,
	Index,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
} from 'typeorm';
import { MovieModel } from '../movies/movie.model';

@Entity('favourites')
@Index(['userId'])
@Index(['movie', 'userId'], { unique: true })
export class FavouritesModel {
	@PrimaryGeneratedColumn()
	readonly id: number;

	@Column({ type: 'uuid', name: 'user_id' })
	readonly userId: string;

	@Column({ type: 'uuid', name: 'movie_id' })
	readonly movieId: string;

	@ManyToOne(() => MovieModel, (movie) => movie.favourites)
	@JoinColumn({ name: 'movie_id' })
	readonly movie: MovieModel;
}
