import { Movie } from '../../../domain';
import {
	Column,
	Entity,
	JoinColumn,
	JoinTable,
	ManyToMany,
	OneToMany,
	PrimaryGeneratedColumn,
} from 'typeorm';
import { GenreModel } from '../genres/genre.model';
import { PersonToFilmModel } from './person-to-film.model';

@Entity('movies')
export class MovieModel implements Movie {
	@PrimaryGeneratedColumn('uuid')
	readonly id: string;

	@Column()
	readonly title: string;

	@Column()
	readonly synopsis: string;

	@Column({ type: 'timestamptz', name: 'release_date' })
	readonly releaseDate: Date;

	@Column({ default: false })
	readonly isDeleted: boolean;

	@ManyToMany(() => GenreModel)
	@JoinTable({
		name: 'movies_genres', // table name for the junction table of this relation
		joinColumn: {
			name: 'movie_id',
			referencedColumnName: 'id',
		},
		inverseJoinColumn: {
			name: 'genre_id',
			referencedColumnName: 'id',
		},
	})
	readonly genres: GenreModel[];

	@OneToMany(() => PersonToFilmModel, (personToFilm) => personToFilm.movie, {
		cascade: true,
		orphanedRowAction: 'delete',
	})
	@JoinColumn({ referencedColumnName: 'movie_id' })
	readonly people: PersonToFilmModel[];
}
