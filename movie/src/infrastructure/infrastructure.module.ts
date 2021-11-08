import { Module } from '@nestjs/common';
import { StorageModule } from './storage/storage.module';
import { BlStorageModule } from './bl-storage';
import typeormConfig = require('../config/typeorm.config');
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
	imports: [
		StorageModule,
		BlStorageModule,
		TypeOrmModule.forRoot({ ...typeormConfig, keepConnectionAlive: true }),
	],
	exports: [StorageModule, BlStorageModule],
})
export class InfrastructureModule {}
