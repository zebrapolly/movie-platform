import { IsOptional, IsString } from "class-validator";

export class SearchGenreDto {
    @IsOptional()
    @IsString()
    readonly name: string;
}