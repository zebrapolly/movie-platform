import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

const config: PostgresConnectionOptions = {
	type: 'postgres',
	host: process.env.TYPEORM_HOST,
	port: Number(process.env.TYPEORM_PORT),
	username: process.env.TYPEORM_USERNAME,
	password: process.env.TYPEORM_PASSWORD,
	database: process.env.TYPEORM_DATABASE,
	entities: [__dirname + './../infrastructure/storage/**/*.model{.ts,.js}'],
	synchronize: false,
	migrations: [__dirname + './../infrastructure/storage/migration/*{.ts,.js}'],
	cli: {
		migrationsDir: './src/infrastructure/storage/migration',
	},
};

export = config;
