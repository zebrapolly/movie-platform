import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: true, // TODO take form config
            secretOrKey: 'secret', // TODO take from config
        });
    }

    async validate(payload: any) {
        return { userId: payload.sub, username: payload.username };
    }
}