import { Injectable, Logger } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { IRegisterUser, User } from "../domain";
import * as bcrypt from "bcryptjs";
import { BlStorageAdapter } from "../infrastructure/bl-storage";

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
        private blAdapter: BlStorageAdapter,
    ) {}

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.usersService.findOne(username);
        if (user && await bcrypt.compare(pass, user.password)) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async login(user: User) {
        const payload = { username: user.username, sub: user.systemId };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    async register(params: IRegisterUser) {
        const { password, ...rest } = params;
        const hash = await bcrypt.hash(password, 2);
        const user = await this.usersService.create({ ...rest, password: hash });
        return this.login(user);
    }

    async logout(bearerHeader: string) {
        const token = bearerHeader.replace('Bearer ','');
        await this.blAdapter.set(token);
        return true;
    }
}