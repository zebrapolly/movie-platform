import { Injectable } from '@nestjs/common';
import { ICreateUser, User } from "../domain";

class UserModel {
    id: number;
    systemId: string;
    username: string;
    password?: string;
}

@Injectable()
export class UsersService {
    private readonly users: UserModel[] = [
        {
            id: 1,
            systemId: '234',
            username: 'john',
            password: 'changeme',
        },
        {
            id: 2,
            systemId: '234',
            username: 'paul',
            password: 'test',
        },
    ];

    async findOne(username: string): Promise<User | undefined> {
        return this.users.find(user => user.username === username);
    }

    async create(params: ICreateUser) {
        const user = {
            id: 6,
            ...params,
            systemId: 'sdfsf'
        }
        this.users.push(user);
        return user;
    }
}