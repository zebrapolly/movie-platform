import { TypeOrmModuleOptions } from "@nestjs/typeorm";

const config: TypeOrmModuleOptions = {
    type: 'postgres',
    host: process.env.TYPEORM_HOST,
    port: Number(process.env.TYPEORM_PORT),
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    database: process.env.TYPEORM_DATABASE,
    entities: ['./dist/infrastructure/storage/**/*.model{.ts,.js}'],
    synchronize: false,
    migrations: ['./dist/infrastructure/storage/migration/*.js'],
    cli: {
        migrationsDir: './dist/storage/migration/'
    }
}

export default config;