import { RedisClientOptions } from "@liaoliaots/nestjs-redis/dist/redis/interfaces/redis-module-options.interface";

const redisConfig: RedisClientOptions & { expTime: number }= {
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT),
    password: process.env.REDIS_PASSWORD,
    keyPrefix: process.env.REDIS_BL_PRIFIX,
    expTime: Number(process.env.JWT_EXPIRATION_TIME)
}

export default redisConfig;