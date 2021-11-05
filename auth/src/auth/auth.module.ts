import { Logger, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from "./local.strategy";
import jwtConfig from '../config/jwt.config';
import { InfrastructureModule } from "../infrastructure";

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register(jwtConfig()),
    InfrastructureModule
  ],
  providers: [AuthService, JwtStrategy, LocalStrategy, Logger],
  exports: [AuthService],
})
export class AuthModule {}