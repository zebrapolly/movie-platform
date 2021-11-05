import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModel } from './user.model';
import { UserStorageAdapter } from './user-storage.adapter';

@Module({
    imports: [TypeOrmModule.forFeature([UserModel])],
    providers: [UserStorageAdapter],
    exports: [UserStorageAdapter],
})
export class UsersStorageModule {}
