import { ExecutionContext, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { BlStorageAdapter } from "../infrastructure";

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    constructor(
        @Inject(BlStorageAdapter) private readonly blAdapter: BlStorageAdapter
    ) {
        super();
    }
    async canActivate(context: ExecutionContext) {
        const bearerHeader = context.switchToHttp().getRequest().headers.authorization;
        const parentCanActivate = (await super.canActivate(context)) as boolean;
        const token = bearerHeader.replace('Bearer ','');
        const isInBlackList = !!(await this.blAdapter.get(token));
        if (isInBlackList) {
            throw new UnauthorizedException();
        }
        return parentCanActivate;
    }
}
