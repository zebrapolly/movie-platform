import { Inject, Injectable } from '@nestjs/common';
import { InjectRedis } from '@liaoliaots/nestjs-redis';
import { Redis } from 'ioredis';
import jwtConfig from "../../config/redis.config";

@Injectable()
export class BlStorageAdapter {
    constructor(
        @InjectRedis() private readonly defaultRedisClient: Redis,
    ) {}

    async set(token: string) {
        await this.defaultRedisClient.setex(token, jwtConfig.expTime, '1');
    }

    async get(token: string) {
        return await this.defaultRedisClient.get(token);
    }
}