import { ApiBearerAuth, ApiTags, ApiResponse } from '@nestjs/swagger';
import { Controller, UseGuards, Body, Post, Get, Query, Put, Delete, Param, Req } from '@nestjs/common';
import { AuthenticatedGuard } from '@craftsjs/auth/guard/authentication.guard';
import { FindOneDto } from '@craftsjs/core/dto/find-one.dto';
import { OrganizationUnitService } from '../services/organization-unit.service';
import { CreateOrganizationUnitDto } from '../../dtos/create-organization-unit.dto';
import { GetOrganizationUnitDto } from '../../dtos/get-organization-unit.dto';
import { UpdateOrganizationUnitDto } from '../../dtos/update-organization-unit.dto';
import { OrganizationUnitDto } from '../../dtos/organization-unit.dto';
import { AddRolesToOrganizationUnitDto } from '../../dtos/add-roles-to-organization-unit.dto';
import { OrganizationUnitRoleDto } from '../../dtos/organization-unit-role.dto';
import { RoleDto } from '@craftsjs/role/application/dtos/role.dto';

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

  @Post('add-roles')
  @ApiResponse({ type: OrganizationUnitRoleDto, isArray: true })
  @UseGuards(AuthenticatedGuard)
  addRolesToOrganizationUnit(@Body() input: AddRolesToOrganizationUnitDto) {
    return this.roleService.addRolesToOrganizationUnit(input);
  }

  @Get(':id')
  @ApiResponse({ type: OrganizationUnitDto })
  @UseGuards(AuthenticatedGuard)
  find(@Param() input: FindOneDto, @Req() req) {
    return this.roleService.find(Object.assign(input, req.body));
  }

  @Get()
  @ApiResponse({ type: OrganizationUnitDto })
  @UseGuards(AuthenticatedGuard)
  findAll(@Query() input: GetOrganizationUnitDto) {
    return this.roleService.findAll(input);
  }

  @Get('roles/:id')
  @ApiResponse({ type: RoleDto, isArray: true })
  @UseGuards(AuthenticatedGuard)
  getRoles(@Param() input: FindOneDto, @Req() req) {
    return this.roleService.getRoles(Object.assign(input, req.body));
  }

  @Get('roles/:id/associate')
  @ApiResponse({ type: RoleDto, isArray: true })
  @UseGuards(AuthenticatedGuard)
  getRolesAssociate(@Param() input: FindOneDto, @Req() req) {
    return this.roleService.getRolesAssociate(Object.assign(input, req.body));
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

  @Delete('roles/:id')
  @UseGuards(AuthenticatedGuard)
  deleteRole(@Param() input: FindOneDto) {
    return this.roleService.removeRole(input);
  }

}
