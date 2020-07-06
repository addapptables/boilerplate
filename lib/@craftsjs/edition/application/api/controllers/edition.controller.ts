import { ApiBearerAuth, ApiTags, ApiResponse } from '@nestjs/swagger';
import { Controller, UseGuards, Body, Post, Get, Query, Put, Delete, Param } from '@nestjs/common';
import { AuthenticatedGuard } from '../../../../auth/guard/authentication.guard';
import { FindOneDto } from '../../../../core/dto/find-one.dto';
import { EditionService } from '../services/edition.service';
import { CreateEditionDto } from '../../dtos/create-edition.dto';
import { GetEditionDto } from '../../dtos/get-edition.dto';
import { UpdateEditionDto } from '../../dtos/update-edition.dto';
import { EditionDto } from '../../dtos/edition.dto';
import { Permissions } from '../../../../auth/decorators/permission.decorator';
import { CREATE_EDITION, GET_EDITION, UPDATE_EDITION, DELETE_EDITION } from '../../../permission';
import { CREATE_TENANT, UPDATE_TENANT } from '../../../../tenant/permission';

@ApiBearerAuth()
@ApiTags('editions')
@Controller('editions')
export class EditionController {

  constructor(private readonly editionService: EditionService) { }

  @Post()
  @ApiResponse({ type: EditionDto })
  @UseGuards(AuthenticatedGuard)
  @Permissions(CREATE_EDITION)
  insert(@Body() createEditionDto: CreateEditionDto) {
    return this.editionService.insert(createEditionDto);
  }

  @Get(':id')
  @ApiResponse({ type: EditionDto })
  @UseGuards(AuthenticatedGuard)
  @Permissions(GET_EDITION)
  find(@Param() input: FindOneDto) {
    return this.editionService.find(input);
  }

  @Get()
  @ApiResponse({ type: EditionDto })
  @UseGuards(AuthenticatedGuard)
  @Permissions(GET_EDITION, CREATE_TENANT, UPDATE_TENANT)
  findAll(@Query() input: GetEditionDto) {
    return this.editionService.findAll(input);
  }

  @Put()
  @ApiResponse({ type: EditionDto })
  @UseGuards(AuthenticatedGuard)
  @Permissions(UPDATE_EDITION)
  update(@Body() updateEditionDto: UpdateEditionDto) {
    return this.editionService.Update(updateEditionDto);
  }

  @Delete(':id')
  @ApiResponse({ type: EditionDto })
  @UseGuards(AuthenticatedGuard)
  @Permissions(DELETE_EDITION)
  delete(@Param() input: FindOneDto) {
    return this.editionService.remove(input);
  }

}
