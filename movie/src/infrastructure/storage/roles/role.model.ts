import { Role } from '../../../domain';
import {
	Column,
	Entity,
	Index,
	OneToMany,
	PrimaryGeneratedColumn,
} from 'typeorm';
import { PersonToFilmModel } from '../movies/person-to-film.model';

@Entity('roles')
export class RoleModel implements Role {
	@PrimaryGeneratedColumn('uuid')
	readonly id: string;

	@Column()
	readonly name: string;

	@Column({ default: false })
	readonly isDeleted: boolean;

	@OneToMany(() => PersonToFilmModel, (personToFilm) => personToFilm.role)
	readonly personToFilm?: PersonToFilmModel;
}
