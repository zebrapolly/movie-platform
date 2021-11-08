import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoleModel } from './role.model';
import { IRoleCreate, IRoleSearch, IRoleUpdate } from '../../../domain';

@Injectable()
export class RolesStorageAdapter {
	constructor(
		@InjectRepository(RoleModel)
		private roleRepository: Repository<RoleModel>,
	) {}

	findById(id: string) {
		return this.roleRepository.findOne({ id });
	}

	search(params: IRoleSearch) {
		return this.roleRepository.find({ where: params });
	}

	async create(payload: IRoleCreate) {
		return this.roleRepository.save(payload);
	}

	async update(id: string, payload: IRoleUpdate) {
		return this.roleRepository.save({ id, ...payload });
	}

	async delete(id: string) {
		return this.roleRepository.save({ id, isDeleted: true });
	}

	async restore(id: string) {
		return this.roleRepository.save({ id, isDeleted: false });
	}
}
