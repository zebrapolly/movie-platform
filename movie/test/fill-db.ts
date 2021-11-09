import { Repository, Connection } from 'typeorm';
import { MovieModel } from '../src/infrastructure/storage/movies/movie.model';
import { RoleModel } from '../src/infrastructure/storage/roles/role.model';
import { PersonModel } from '../src/infrastructure/storage/persons/person.model';
import { GenreModel } from '../src/infrastructure/storage/genres/genre.model';
import {
	genre1,
	genre2,
	genre3,
	genre4,
	movie1,
	movie2,
	movie3,
	person1,
	person2,
	person3,
	person4,
	role1,
	role2,
	role3,
	role4,
} from './datasets';

export async function fillDb(connection: Connection) {
	let movieRepository: Repository<MovieModel> =
		connection.getRepository(MovieModel);
	let roleRepository: Repository<RoleModel> =
		connection.getRepository(RoleModel);
	let personRepository: Repository<PersonModel> =
		connection.getRepository(PersonModel);
	let genreRepository: Repository<GenreModel> =
		connection.getRepository(GenreModel);

	await connection.query('TRUNCATE TABLE "movies" CASCADE');
	await connection.query('TRUNCATE TABLE "persons" CASCADE');
	await connection.query('TRUNCATE TABLE "roles" CASCADE');
	await connection.query('TRUNCATE TABLE "genres" CASCADE');

	await genreRepository.save([genre1, genre2, genre3, genre4]);
	await personRepository.save([person1, person2, person3, person4]);
	await roleRepository.save([role1, role2, role3, role4]);
	await movieRepository.save([movie1, movie2, movie3]);
}

export async function emptyDb(connection: Connection) {
	await connection.query('TRUNCATE TABLE "movies" CASCADE');
	await connection.query('TRUNCATE TABLE "persons" CASCADE');
	await connection.query('TRUNCATE TABLE "roles" CASCADE');
	await connection.query('TRUNCATE TABLE "genres" CASCADE');
}
