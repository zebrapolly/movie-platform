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
} from '@nestjs/common';
import { MoviesService } from '../core';
import { MovieCreateDto, MovieUpdateDto } from './dto';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('movies')
export class MoviesController {
	constructor(private readonly moviesService: MoviesService) {}

	@Post()
	@UseGuards(JwtAuthGuard)
	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	create(@Body() createMovieDto: MovieCreateDto) {
		return this.moviesService.create(createMovieDto);
	}

	@Get()
	@UseGuards(JwtAuthGuard)
	findAll() {
		return this.moviesService.findAll();
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
