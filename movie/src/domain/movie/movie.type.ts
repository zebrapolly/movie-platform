import { Genre } from '../genre/genre.type';
import { Person } from '../person/person.type';
import { Role } from '../role/role.type';

export type Movie = {
	readonly id: string;
	readonly title: string;
	readonly releaseDate: Date;
	readonly synopsis: string;
	readonly genres: Genre[];
	readonly people: {
		person: Person;
		role: Role;
	}[];
	readonly isDeleted: boolean;
	readonly userId: string;
};
