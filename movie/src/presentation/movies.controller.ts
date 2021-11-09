import {
	Controller,
	Get,
	Post,
	Body,
	Put,
	Param,
	Delete,
	UseGuards,
	UsePipes,
	ValidationPipe,
	HttpCode,
	Query,
} from '@nestjs/common';
import { MoviesService } from '../core';
import { MovieCreateDto, MovieSearchDto, MovieUpdateDto } from './dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { AuthUser } from './jwt.auth-user.decorator';

@Controller('movies')
export class MoviesController {
	constructor(private readonly moviesService: MoviesService) {}

	@Post()
	@UseGuards(JwtAuthGuard)
	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	create(@Body() createMovieDto: MovieCreateDto, @AuthUser() { userId }) {
		return this.moviesService.create({ ...createMovieDto, userId });
	}

	@Get()
	@UseGuards(JwtAuthGuard)
	@UsePipes(new ValidationPipe())
	findAll(@Query() params: MovieSearchDto) {
		return this.moviesService.findAll(params);
	}

	@Get(':id')
	@UseGuards(JwtAuthGuard)
	findOne(@Param('id') id: string) {
		return this.moviesService.findOne(id);
	}

	@Put(':id')
	@UseGuards(JwtAuthGuard)
	@UsePipes(new ValidationPipe())
	update(@Param('id') id: string, @Body() updateMovieDto: MovieUpdateDto) {
		return this.moviesService.update(id, updateMovieDto);
	}

	@Delete(':id')
	@UseGuards(JwtAuthGuard)
	remove(@Param('id') id: string) {
		return this.moviesService.remove(id);
	}
}
