import { ApiBearerAuth, ApiTags, ApiResponse } from '@nestjs/swagger';
import { Controller, UseGuards, Body, Post, Get, Query, Put, Delete, Param } from '@nestjs/common';
import { AuthenticatedGuard } from '@craftsjs/auth/guard/authentication.guard';
import { FindOneDto } from '@craftsjs/core/dto/find-one.dto';
import { EditionService } from '../services/edition.service';
import { CreateEditionDto } from '../../dtos/create-edition.dto';
import { GetEditionDto } from '../../dtos/get-edition.dto';
import { UpdateEditionDto } from '../../dtos/update-edition.dto';
import { EditionDto } from '../../dtos/edition.dto';

@ApiBearerAuth()
@ApiTags('editions')
@Controller('editions')
export class EditionController {

  constructor(private readonly editionService: EditionService) { }

  @Post()
  @ApiResponse({ type: EditionDto })
  @UseGuards(AuthenticatedGuard)
  insert(@Body() createEditionDto: CreateEditionDto) {
    return this.editionService.insert(createEditionDto);
  }

  @Get(':id')
  @ApiResponse({ type: EditionDto })
  @UseGuards(AuthenticatedGuard)
  find(@Param() input: FindOneDto) {
    return this.editionService.find(input);
  }

  @Get()
  @ApiResponse({ type: EditionDto })
  @UseGuards(AuthenticatedGuard)
  findAll(@Query() input: GetEditionDto) {
    return this.editionService.findAll(input);
  }

  @Put()
  @ApiResponse({ type: EditionDto })
  @UseGuards(AuthenticatedGuard)
  update(@Body() updateEditionDto: UpdateEditionDto) {
    return this.editionService.Update(updateEditionDto);
  }

  @Delete(':id')
  @ApiResponse({ type: EditionDto })
  @UseGuards(AuthenticatedGuard)
  delete(@Param() input: FindOneDto) {
    return this.editionService.remove(input);
  }

}
