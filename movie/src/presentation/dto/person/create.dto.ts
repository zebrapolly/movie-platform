import { IsString, MaxLength } from "class-validator";

export class PersonCreateDto {
    @IsString()
    @MaxLength(100)
    readonly name: string
}