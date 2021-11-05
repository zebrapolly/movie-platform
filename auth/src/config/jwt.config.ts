import { registerAs } from "@nestjs/config";

// TODO env validation
export default registerAs('jwt', () => ({
    secret: process.env.JWT_SECRET || 'secret',
    signOptions: {
        expiresIn: process.env.JWT_EXPIRATION_TIME + 's' || '60s'
    },
    ignoreExpiration: process.env.JWT_IGNORE_EXPIRATION === 'true'
}));