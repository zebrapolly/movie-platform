import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PersonModel } from "./person.model";
import { IPersonCreate, IPersonSearch, IPersonUpdate } from "../../../domain";

@Injectable()
export class PersonsStorageAdapter {
    constructor(
        @InjectRepository(PersonModel)
        private personRepository: Repository<PersonModel>,
    ) {}

    findById(id: string) {
        return this.personRepository.findOne({ id });
    }

    search(params: IPersonSearch) {
        return this.personRepository.find({ where: params });
    }

    async create(payload: IPersonCreate) {
        return this.personRepository.save(payload);
    }

    async update(id: string, payload: IPersonUpdate) {
        return this.personRepository.save({ id, ...payload });
    }

    async delete(id: string) {
        return this.personRepository.save({ id, isDeleted: true });
    }

    async restore(id: string) {
        return this.personRepository.save({ id, isDeleted: false });
    }
}
