import { Module } from "@nestjs/common";
import { UsersStorageModule } from "./storage";
import { TypeOrmModule } from "@nestjs/typeorm";
import typeormConfig from "../config/typeorm.config";

@Module({
    imports: [
        TypeOrmModule.forRoot(typeormConfig),
        UsersStorageModule
    ],
    exports: [UsersStorageModule]
})
export class InfrastructureModule {}