import { IsDateString, IsOptional, IsString, Max, MaxLength, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { People } from "./people.dto";
import { GenreRelation } from "./genre-relation.dto";

export class MovieUpdateDto {
    @IsString()
    @MaxLength(100)
    @IsOptional()
    readonly title: string;

    @IsString()
    @MaxLength(500)
    @IsOptional()
    readonly synopsis: string;

    @IsDateString()
    @IsOptional()
    readonly releaseDate: string;

    @ValidateNested({ each: true })
    @Type(() => People)
    @IsOptional()
    readonly people: People[]

    @ValidateNested({ each: true })
    @IsOptional()
    @Type(() => GenreRelation)
    genres: GenreRelation[]
}