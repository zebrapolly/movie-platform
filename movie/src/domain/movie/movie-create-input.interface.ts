import {
	IsDateString,
	IsString,
	MaxLength,
	ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { People } from '../../presentation/dto/movie/people.dto';
import { GenreRelation } from '../../presentation/dto/movie/genre-relation.dto';

export interface IMovieCreateInput {
	readonly title: string;
	readonly synopsis: string;
	readonly releaseDate: string;
	readonly people: {
		roleId: string;
		personId: string;
	}[];
	genres: { id: string }[];
	userId: string;
}
