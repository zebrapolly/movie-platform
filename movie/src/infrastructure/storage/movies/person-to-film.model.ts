import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { MovieModel } from "./movie.model";
import { PersonModel } from "../persons/person.model";
import { RoleModel } from "../roles/role.model";

@Entity('person_to_film')
@Index(['movieId'])
@Index(["movieId", "person", "role"], { unique: true })
export class PersonToFilmModel {

    @PrimaryColumn({ name: 'movie_id' })
    readonly movieId: string;

    @PrimaryColumn({ name: 'person_id' })
    readonly personId: string;

    @PrimaryColumn({ name: 'role_id' })
    readonly roleId: string

    @ManyToOne(() => MovieModel, movie => movie.people)
    @JoinColumn({ name: "movie_id" })
    readonly movie: MovieModel;

    @ManyToOne(() => PersonModel, person => person.personToFilm)
    @JoinColumn({ name: "person_id" })
    readonly person: PersonModel;

    @ManyToOne(() => RoleModel, role => role.personToFilm)
    @JoinColumn({ name: "role_id" })
    readonly role: RoleModel;
}