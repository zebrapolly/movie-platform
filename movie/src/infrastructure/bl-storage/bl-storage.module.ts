import { Global, Module } from '@nestjs/common';
import { RedisModule } from '@liaoliaots/nestjs-redis';
import redisConfig from '../../config/redis.config';
import { BlStorageAdapter } from './bl-storage.adapter';

@Global()
@Module({
	imports: [
		RedisModule.forRoot({
			closeClient: true,
			// @ts-ignore
			config: redisConfig,
		}),
	],
	providers: [BlStorageAdapter],
	exports: [BlStorageAdapter],
})
export class BlStorageModule {}
