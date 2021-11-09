import * as faker from 'faker';
import { GenreModel } from '../src/infrastructure/storage/genres/genre.model';
import { RoleModel } from '../src/infrastructure/storage/roles/role.model';
import { PersonModel } from '../src/infrastructure/storage/persons/person.model';
import { Movie } from '../src/domain';

export const genre1: GenreModel = {
	id: faker.datatype.uuid(),
	name: 'Action',
	isDeleted: false,
};
export const genre2: GenreModel = {
	id: faker.datatype.uuid(),
	name: 'Comedy',
	isDeleted: false,
};
export const genre3: GenreModel = {
	id: faker.datatype.uuid(),
	name: 'Drama',
	isDeleted: false,
};
export const genre4: GenreModel = {
	id: faker.datatype.uuid(),
	name: 'Horror',
	isDeleted: false,
};
export const person1: PersonModel = {
	id: faker.datatype.uuid(),
	name: faker.name.firstName() + ' ' + faker.name.lastName(),
	isDeleted: false,
};
export const person2: PersonModel = {
	id: faker.datatype.uuid(),
	name: faker.name.firstName() + ' ' + faker.name.lastName(),
	isDeleted: false,
};
export const person3: PersonModel = {
	id: faker.datatype.uuid(),
	name: faker.name.firstName() + ' ' + faker.name.lastName(),
	isDeleted: false,
};
export const person4: PersonModel = {
	id: faker.datatype.uuid(),
	name: faker.name.firstName() + ' ' + faker.name.lastName(),
	isDeleted: false,
};
export const role1: RoleModel = {
	id: faker.datatype.uuid(),
	name: faker.name.jobTitle(),
	isDeleted: false,
};
export const role2: RoleModel = {
	id: faker.datatype.uuid(),
	name: faker.name.jobTitle(),
	isDeleted: false,
};
export const role3: RoleModel = {
	id: faker.datatype.uuid(),
	name: faker.name.jobTitle(),
	isDeleted: false,
};
export const role4: RoleModel = {
	id: faker.datatype.uuid(),
	name: faker.name.jobTitle(),
	isDeleted: false,
};

export const movie1: Movie = {
	id: faker.datatype.uuid(),
	title: 'Green Mile',
	synopsis: faker.lorem.text(),
	releaseDate: new Date('1988-03-22T10:23:23.568Z'),
	genres: [genre1],
	people: [
		{
			person: person1,
			role: role1,
		},
	],
	isDeleted: false,
	userId: faker.datatype.uuid(),
};

export const movie2: Movie = {
	id: faker.datatype.uuid(),
	title: 'Green Book',
	synopsis: faker.lorem.text(),
	releaseDate: new Date('2021-04-15T10:23:23.568Z'),
	genres: [genre1, genre2],
	people: [
		{
			person: person1,
			role: role1,
		},
	],
	isDeleted: false,
	userId: faker.datatype.uuid(),
};

export const movie3: Movie = {
	id: faker.datatype.uuid(),
	title: 'Lion King',
	synopsis: faker.lorem.text(),
	releaseDate: new Date('2000-01-11T11:22:24.538Z'),
	genres: [genre2, genre3],
	people: [
		{
			person: person2,
			role: role2,
		},
		{
			person: person2,
			role: role3,
		},
	],
	isDeleted: false,
	userId: faker.datatype.uuid(),
};
