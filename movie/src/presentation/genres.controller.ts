import {
	Controller,
	Get,
	Post,
	Body,
	Param,
	Delete,
	UseGuards,
	UsePipes,
	ValidationPipe,
	Put,
	Query,
} from '@nestjs/common';
import { GenresService } from '../core';
import { GenreCreateDto, GenreUpdateDto, SearchGenreDto } from './dto';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('genres')
export class GenresController {
	constructor(private readonly genresService: GenresService) {}

	@Post()
	@UseGuards(JwtAuthGuard)
	@UsePipes(new ValidationPipe())
	create(@Body() createGenreDto: GenreCreateDto) {
		return this.genresService.create(createGenreDto);
	}

	@Get()
	@UseGuards(JwtAuthGuard)
	@UsePipes(new ValidationPipe())
	findAll(@Query() params: SearchGenreDto) {
		return this.genresService.findAll(params);
	}

	@Get(':id')
	@UseGuards(JwtAuthGuard)
	findOne(@Param('id') id: string) {
		return this.genresService.findOne(id);
	}

	@Put(':id')
	@UsePipes(new ValidationPipe())
	@UseGuards(JwtAuthGuard)
	update(@Param('id') id: string, @Body() updateGenreDto: GenreUpdateDto) {
		return this.genresService.update(id, updateGenreDto);
	}

	@Delete(':id')
	@UseGuards(JwtAuthGuard)
	remove(@Param('id') id: string) {
		return this.genresService.remove(id);
	}
}
