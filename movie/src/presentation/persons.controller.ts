import {
	Controller,
	Get,
	Post,
	Body,
	Param,
	Delete,
	UsePipes,
	ValidationPipe,
	Put,
	UseGuards,
	Query,
} from '@nestjs/common';
import { PersonsService } from '../core';
import { PersonCreateDto, PersonSearchDto, PersonUpdateDto } from './dto';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('persons')
export class PersonsController {
	constructor(private readonly personsService: PersonsService) {}

	@Post()
	@UseGuards(JwtAuthGuard)
	@UsePipes(new ValidationPipe())
	create(@Body() createPersonDto: PersonCreateDto) {
		return this.personsService.create(createPersonDto);
	}

	@Get()
	@UseGuards(JwtAuthGuard)
	@UsePipes(new ValidationPipe())
	findAll(@Query() params: PersonSearchDto) {
		return this.personsService.findAll(params);
	}

	@Get(':id')
	@UseGuards(JwtAuthGuard)
	findOne(@Param('id') id: string) {
		return this.personsService.findOne(id);
	}

	@Put(':id')
	@UseGuards(JwtAuthGuard)
	@UsePipes(new ValidationPipe())
	update(@Param('id') id: string, @Body() updatePersonDto: PersonUpdateDto) {
		return this.personsService.update(id, updatePersonDto);
	}

	@Delete(':id')
	@UseGuards(JwtAuthGuard)
	remove(@Param('id') id: string) {
		return this.personsService.remove(id);
	}
}
