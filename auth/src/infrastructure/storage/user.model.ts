import { Entity, PrimaryGeneratedColumn, Generated, Column, Index } from 'typeorm';
import { User } from '../../domain';

@Entity('users')
export class UserModel implements User {
    @PrimaryGeneratedColumn()
    readonly id: number;

    @Column({ name: 'system_id', type: 'uuid'})
    @Index({unique: true})
    @Generated('uuid')
    readonly systemId: string;

    @Column()
    @Index({unique: true})
    readonly username: string;

    @Column()
    readonly password: string;
}