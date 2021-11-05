import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserModel } from './user.model';
import { ICreateUser, IUserSearch } from '../../domain';

@Injectable()
export class UserStorageAdapter {
    constructor(
        @InjectRepository(UserModel)
        private usersRepository: Repository<UserModel>,
    ) {}

    findOne(params: IUserSearch) {
        return this.usersRepository.findOne({ where: params });
    }

    create(payload: ICreateUser) {
        return this.usersRepository.save(payload)
    }
}
