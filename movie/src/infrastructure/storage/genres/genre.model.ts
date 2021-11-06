import { Genre } from "../../../domain";
import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Entity('genres')
export class GenreModel implements Genre {
    @PrimaryGeneratedColumn('uuid')
    readonly id: string;

    @Column()
    readonly name: string;

    @Column({ default: false })
    readonly isDeleted: boolean;
}