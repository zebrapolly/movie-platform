import { IsString, IsUUID, Max, MaxLength } from "class-validator";

export class RoleUpdateDto {
    @IsString()
    @MaxLength(30)
    readonly name: string;
}