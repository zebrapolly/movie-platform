import { BadRequestException, Injectable } from '@nestjs/common';
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

    async create(payload: ICreateUser) {
        try {
            return await this.usersRepository.save(payload)
        } catch (error) {
            console.log(JSON.stringify(error, null, 4))
            if (error.code === '23505') {
                throw new BadRequestException('username already exists')
            }
            throw error;
        }
    }
}
