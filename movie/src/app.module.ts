import { Module } from '@nestjs/common';
import { PresentationModule } from './presentation/presentation.module';
import { ConfigModule } from '@nestjs/config';
import jwtConfig from './config/jwt.config';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			load: [jwtConfig],
		}),
		PresentationModule,
	],
})
export class AppModule {}
