const redisConfig = {
	host: process.env.REDIS_HOST,
	port: parseInt(process.env.REDIS_PORT),
	password: process.env.REDIS_PASSWORD,
	keyPrefix: process.env.REDIS_BL_PRIFIX,
	expTime: Number(process.env.JWT_EXPIRATION_TIME),
};

export default redisConfig;
