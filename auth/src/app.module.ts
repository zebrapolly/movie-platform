import { Module } from '@nestjs/common';
import { AppController } from './presentation';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import jwtConfig from './config/jwt.config';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			load: [jwtConfig]
		}),
		AuthModule,
		UsersModule
	],
	controllers: [AppController],
	providers: [],
})
export class AppModule {}
