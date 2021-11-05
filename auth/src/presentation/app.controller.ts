import { Controller, Request, Post, UseGuards, HttpCode, UsePipes, ValidationPipe, Body, Headers } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { LocalAuthGuard } from "../auth/local-auth.guard";
import { RegisterDto } from "./dto";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";

@Controller()
export class AppController {
	constructor(private authService: AuthService) {}

	@UseGuards(LocalAuthGuard)
	@Post('/login')
	@HttpCode(200)
	async login(@Request() req) {
		return this.authService.login(req.user);
	}

	@Post('/register')
	@HttpCode(200)
	@UsePipes(new ValidationPipe())
	async register(@Body() registerDto: RegisterDto) {
		return this.authService.register(registerDto);
	}

	@Post('/logout')
	@HttpCode(200)
	@UseGuards(JwtAuthGuard)
	async logout(@Headers('Authorization') authHeader: string) {
		return this.authService.logout(authHeader);
	}
}