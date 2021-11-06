import { Injectable } from '@nestjs/common';
import { RoleCreateDto, RoleSearchDto, RoleUpdateDto } from "../../presentation/dto";
import { RolesStorageAdapter } from "../../infrastructure";

@Injectable()
export class RolesService {
  constructor(
      private readonly rolesStorage: RolesStorageAdapter
  ) {
  }
  create(createRoleDto: RoleCreateDto) {
    return this.rolesStorage.create(createRoleDto);
  }

  findAll(params: RoleSearchDto) {
    return this.rolesStorage.search(params);
  }

  findOne(id: string) {
    return this.rolesStorage.findById(id);
  }

  update(id: string, updateRoleDto: RoleUpdateDto) {
    return this.rolesStorage.update(id, updateRoleDto);
  }

  remove(id: string) {
    return this.rolesStorage.delete(id);
  }
}
