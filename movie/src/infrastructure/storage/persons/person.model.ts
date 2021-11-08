import { Person } from '../../../domain';
import {
	Column,
	Entity,
	Index,
	OneToMany,
	PrimaryGeneratedColumn,
} from 'typeorm';
import { PersonToFilmModel } from '../movies/person-to-film.model';

@Entity('persons')
export class PersonModel implements Person {
	@PrimaryGeneratedColumn('uuid')
	readonly id: string;

	@Column()
	readonly name: string;

	@Column({ default: false })
	readonly isDeleted: boolean;

	@OneToMany(() => PersonToFilmModel, (personToFilm) => personToFilm.person)
	readonly personToFilm?: PersonToFilmModel;
}
