import {
	IsDateString,
	IsString,
	IsUUID,
	MaxLength,
	ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { People } from './people.dto';
import { GenreRelation } from './genre-relation.dto';

export class MovieCreateDto {
	@IsString()
	@MaxLength(100)
	readonly title: string;

	@IsString()
	@MaxLength(500)
	readonly synopsis: string;

	@IsDateString()
	readonly releaseDate: string;

	@ValidateNested({ each: true })
	@Type(() => People)
	readonly people: People[];

	@ValidateNested({ each: true })
	@Type(() => GenreRelation)
	genres: GenreRelation[];
}
