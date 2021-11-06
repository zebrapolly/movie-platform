import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonModel } from './person.model';
import { PersonsStorageAdapter } from './persons-storage.adapter';

@Module({
    imports: [TypeOrmModule.forFeature([PersonModel])],
    providers: [PersonsStorageAdapter],
    exports: [PersonsStorageAdapter],
})
export class PersonsStorageModule {}
