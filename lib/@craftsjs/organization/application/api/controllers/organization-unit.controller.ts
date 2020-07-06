import { ApiBearerAuth, ApiTags, ApiResponse } from '@nestjs/swagger';
import { Controller, UseGuards, Body, Post, Get, Query, Put, Delete, Param, Req } from '@nestjs/common';
import { AuthenticatedGuard } from '../../../../auth/guard/authentication.guard';
import { FindOneDto } from '../../../../core/dto/find-one.dto';
import { OrganizationUnitService } from '../services/organization-unit.service';
import { CreateOrganizationUnitDto } from '../../dtos/create-organization-unit.dto';
import { GetOrganizationUnitDto } from '../../dtos/get-organization-unit.dto';
import { UpdateOrganizationUnitDto } from '../../dtos/update-organization-unit.dto';
import { OrganizationUnitDto } from '../../dtos/organization-unit.dto';
import { AddRolesToOrganizationUnitDto } from '../../dtos/add-roles-to-organization-unit.dto';
import { OrganizationUnitRoleDto } from '../../dtos/organization-unit-role.dto';
import { RoleDto } from '../../../../role/application/dtos/role.dto';
import { Permissions } from '../../../../auth/decorators/permission.decorator';
import {
  CREATE_ORGANIZATION_UNIT,
  ADD_ROLES_ORGANIZATION_UNIT,
  GET_ORGANIZATION_UNIT,
  UPDATE_ORGANIZATION_UNIT,
  DELETE_ORGANIZATION_UNIT
} from '../../../permission';

@ApiBearerAuth()
@ApiTags('organization-units')
@Controller('organization-units')
export class OrganizationUnitController {

  constructor(private readonly organizationUnitService: OrganizationUnitService) { }

  @Post()
  @ApiResponse({ type: OrganizationUnitDto })
  @UseGuards(AuthenticatedGuard)
  @Permissions(CREATE_ORGANIZATION_UNIT)
  insert(@Body() createOrganizationUnitDto: CreateOrganizationUnitDto) {
    return this.organizationUnitService.insert(createOrganizationUnitDto);
  }

  @Post('add-roles')
  @ApiResponse({ type: OrganizationUnitRoleDto, isArray: true })
  @UseGuards(AuthenticatedGuard)
  @Permissions(ADD_ROLES_ORGANIZATION_UNIT)
  addRolesToOrganizationUnit(@Body() input: AddRolesToOrganizationUnitDto) {
    return this.organizationUnitService.addRolesToOrganizationUnit(input);
  }

  @Get(':id')
  @ApiResponse({ type: OrganizationUnitDto })
  @UseGuards(AuthenticatedGuard)
  find(@Param() input: FindOneDto, @Req() req) {
    return this.organizationUnitService.find(Object.assign(input, req.body));
  }

  @Get()
  @ApiResponse({ type: OrganizationUnitDto })
  @UseGuards(AuthenticatedGuard)
  @Permissions(GET_ORGANIZATION_UNIT)
  findAll(@Query() input: GetOrganizationUnitDto) {
    return this.organizationUnitService.findAll(input);
  }

  @Get('user/organization-units')
  @ApiResponse({ type: OrganizationUnitDto })
  @UseGuards(AuthenticatedGuard)
  findAllOrganizationUnitUser() {
    return this.organizationUnitService.getOrganizationUnitUser();
  }

  @Get('roles/:id')
  @ApiResponse({ type: RoleDto, isArray: true })
  @UseGuards(AuthenticatedGuard)
  @Permissions(GET_ORGANIZATION_UNIT)
  getRoles(@Param() input: FindOneDto, @Req() req) {
    return this.organizationUnitService.getRoles(Object.assign(input, req.body));
  }

  @Get('roles/:id/associate')
  @ApiResponse({ type: RoleDto, isArray: true })
  @UseGuards(AuthenticatedGuard)
  @Permissions(GET_ORGANIZATION_UNIT)
  getRolesAssociate(@Param() input: FindOneDto, @Req() req) {
    return this.organizationUnitService.getRolesAssociate(Object.assign(input, req.body));
  }

  @Put()
  @ApiResponse({ type: OrganizationUnitDto })
  @UseGuards(AuthenticatedGuard)
  @Permissions(UPDATE_ORGANIZATION_UNIT)
  update(@Body() updateOrganizationUnitDto: UpdateOrganizationUnitDto) {
    return this.organizationUnitService.Update(updateOrganizationUnitDto);
  }

  @Delete(':id')
  @UseGuards(AuthenticatedGuard)
  @Permissions(DELETE_ORGANIZATION_UNIT)
  delete(@Param() input: FindOneDto) {
    return this.organizationUnitService.remove(input);
  }

  @Delete('roles/:id')
  @UseGuards(AuthenticatedGuard)
  @Permissions(ADD_ROLES_ORGANIZATION_UNIT)
  deleteRole(@Param() input: FindOneDto) {
    return this.organizationUnitService.removeRole(input);
  }

}
