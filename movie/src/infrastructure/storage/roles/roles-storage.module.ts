import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleModel } from './role.model';
import { RolesStorageAdapter } from './roles-storage.adapter';

@Module({
	imports: [TypeOrmModule.forFeature([RoleModel])],
	providers: [RolesStorageAdapter],
	exports: [RolesStorageAdapter],
})
export class RolesStorageModule {}
