import { Injectable } from '@nestjs/common';
import { ICreateUser, User } from "../domain";
import { UserStorageAdapter } from "../infrastructure";

class UserModel {
    id: number;
    systemId: string;
    username: string;
    password?: string;
}

@Injectable()
export class UsersService {
    constructor(
        private readonly userAdapter: UserStorageAdapter
    ) {
    }

    async findOne(username: string): Promise<User | undefined> {
        return this.userAdapter.findOne({ username });
    }

    async create(params: ICreateUser) {
        return this.userAdapter.create(params);
    }
}