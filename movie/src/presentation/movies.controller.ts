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
	Res,
	UploadedFile,
	UseInterceptors,
} from '@nestjs/common';
import { MoviesService } from '../core';
import { MovieCreateDto, MovieSearchDto, MovieUpdateDto } from './dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { AuthUser } from './jwt.auth-user.decorator';
import { FileInterceptor } from '@nestjs/platform-express';

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

	@Get('csv')
	@UseGuards(JwtAuthGuard)
	async getCSV(@Res() response) {
		const file = await this.moviesService.getCSV();
		response.set({
			'Content-Type': 'application/octet-stream',
			'Content-Disposition': 'attachment; filename="export.csv"',
		});
		response.charset = 'UTF-8';
		file.pipe(response);
	}

	@Post('csv')
	@UseGuards(JwtAuthGuard)
	@UseInterceptors(FileInterceptor('file'))
	async importCSV(
		@Res() response,
		@UploadedFile() file: Express.Multer.File,
		@AuthUser() { userId },
	) {
		return this.moviesService.importCSV(file, userId);
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
