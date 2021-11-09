import {
	Controller,
	Get,
	Post,
	Body,
	Delete,
	UseGuards,
	UsePipes,
	ValidationPipe,
	HttpCode,
} from '@nestjs/common';
import { FavouritesService } from '../core';
import { AddFavouriteDto, DeleteFavouriteDto } from './dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { AuthUser } from './jwt.auth-user.decorator';

@Controller('favourites')
export class FavouritesController {
	constructor(private readonly favouritesService: FavouritesService) {}

	@Post()
	@HttpCode(200)
	@UseGuards(JwtAuthGuard)
	@UsePipes(new ValidationPipe())
	addFavourites(
		@Body() addFavouriteDto: AddFavouriteDto,
		@AuthUser() { userId },
	) {
		return this.favouritesService.add({ ...addFavouriteDto, userId });
	}

	@Get()
	@UseGuards(JwtAuthGuard)
	getFavourites(@AuthUser() { userId }) {
		return this.favouritesService.get(userId);
	}

	@Delete()
	@UseGuards(JwtAuthGuard)
	deleteFromFavourites(
		@Body() deleteFavouriteDto: DeleteFavouriteDto,
		@AuthUser() { userId },
	) {
		return this.favouritesService.delete({ ...deleteFavouriteDto, userId });
	}
}
