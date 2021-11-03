import { Controller, Request, Post, UseGuards, HttpCode } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { LocalAuthGuard } from "./auth/local-auth.guard";

@Controller()
export class AppController {
	constructor(private authService: AuthService) {}

	@UseGuards(LocalAuthGuard)
	@Post('/login')
	@HttpCode(200)
	async login(@Request() req) {
		return this.authService.login(req.user);
	}
}