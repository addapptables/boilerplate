import { ApiBearerAuth, ApiTags, ApiResponse } from '@nestjs/swagger';
import { Controller, UseGuards, Body, Post, Get, Query, Put, Delete, Param } from '@nestjs/common';
import { OrganizationUnitService } from '../services/organization-unit.service';
import { AuthenticatedGuard } from '@craftsjs/auth/guard/authentication.guard';
import { CreateOrganizationUnitDto } from '../../dtos/create-organization-unit.dto';
import { FindOneDto } from '@craftsjs/core/dto/find-one.dto';
import { GetOrganizationUnitDto } from '../../dtos/get-organization-unit.dto';
import { UpdateOrganizationUnitDto } from '../../dtos/update-organization-unit.dto';
import { OrganizationUnitDto } from '../../dtos/organization-unit.dto';

@ApiBearerAuth()
@ApiTags('organization-units')
@Controller('organization-units')
export class OrganizationUnitController {

  constructor(private readonly roleService: OrganizationUnitService) { }

  @Post()
  @ApiResponse({ type: OrganizationUnitDto })
  @UseGuards(AuthenticatedGuard)
  insert(@Body() createOrganizationUnitDto: CreateOrganizationUnitDto) {
    return this.roleService.insert(createOrganizationUnitDto);
  }

  @Get(':id')
  @ApiResponse({ type: OrganizationUnitDto })
  @UseGuards(AuthenticatedGuard)
  find(@Param() input: FindOneDto) {
    return this.roleService.find(input);
  }

  @Get()
  @ApiResponse({ type: OrganizationUnitDto })
  @UseGuards(AuthenticatedGuard)
  findAll(@Query() input: GetOrganizationUnitDto) {
    return this.roleService.findAll(input);
  }

  @Put()
  @ApiResponse({ type: OrganizationUnitDto })
  @UseGuards(AuthenticatedGuard)
  update(@Body() updateOrganizationUnitDto: UpdateOrganizationUnitDto) {
    return this.roleService.Update(updateOrganizationUnitDto);
  }

  @Delete(':id')
  @UseGuards(AuthenticatedGuard)
  delete(@Param() input: FindOneDto) {
    return this.roleService.remove(input);
  }

}
