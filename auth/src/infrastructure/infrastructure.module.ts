import { Module } from "@nestjs/common";
import { UsersStorageModule } from "./storage";
import { TypeOrmModule } from "@nestjs/typeorm";
import typeormConfig from "../config/typeorm.config";
import { BlStorageModule } from "./bl-storage";

@Module({
    imports: [
        TypeOrmModule.forRoot(typeormConfig),
        UsersStorageModule,
        BlStorageModule
    ],
    exports: [
        UsersStorageModule,
        BlStorageModule
    ]
})
export class InfrastructureModule {}