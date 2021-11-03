import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import commonConfig from './config/common.config';
import { Logger } from '@nestjs/common';
import logger from './logger';

async function bootstrap() {
	const app = await NestFactory.create(AppModule, {
		logger
	});
	await app.listen(commonConfig().port, () => { Logger.log(`Listening on port ${commonConfig().port}`) });
}
bootstrap();
