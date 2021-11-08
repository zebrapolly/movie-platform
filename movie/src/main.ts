import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';
import logger from './logger';
import commonConfig from './config/common.config';

async function bootstrap() {
	const app = await NestFactory.create(AppModule, {
		logger,
	});
	await app.listen(commonConfig().port, () => {
		Logger.log(`Listening on port ${commonConfig().port}`);
	});
}
bootstrap();
