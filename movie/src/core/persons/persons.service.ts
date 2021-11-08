import { Injectable } from '@nestjs/common';
import {
	PersonCreateDto,
	PersonSearchDto,
	PersonUpdateDto,
} from '../../presentation/dto';
import { PersonsStorageAdapter } from '../../infrastructure';

@Injectable()
export class PersonsService {
	constructor(private readonly personsStorage: PersonsStorageAdapter) {}
	create(createPersonDto: PersonCreateDto) {
		return this.personsStorage.create(createPersonDto);
	}

	findAll(params: PersonSearchDto) {
		return this.personsStorage.search(params);
	}

	findOne(id: string) {
		return this.personsStorage.findById(id);
	}

	update(id: string, updatePersonDto: PersonUpdateDto) {
		return this.personsStorage.update(id, updatePersonDto);
	}

	remove(id: string) {
		return this.personsStorage.delete(id);
	}
}
