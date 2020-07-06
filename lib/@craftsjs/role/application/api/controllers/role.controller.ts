import { ApiBearerAuth, ApiTags, ApiResponse } from '@nestjs/swagger';
import { Controller, UseGuards, Body, Post, Get, Query, Put, Delete, Param } from '@nestjs/common';
import { RoleService } from '../services/role.service';
import { AuthenticatedGuard } from '../../../../auth/guard/authentication.guard';
import { CreateRoleDto } from '../../dtos/create-role.dto';
import { FindOneDto } from '../../../../core/dto/find-one.dto';
import { GetRoleDto } from '../../dtos/get-role.dto';
import { UpdateRoleDto } from '../../dtos/update-role.dto';
import { RoleDto } from '../../dtos/role.dto';
import { Permissions } from '../../../../auth/decorators/permission.decorator';
import { CREATE_ROLE, GET_ROLE, UPDATE_ROLE, DELETE_ROLE } from '../../../permission';
import { CREATE_USER, UPDATE_USER } from '../../../../user/permission';

@ApiBearerAuth()
@ApiTags('roles')
@Controller('roles')
export class RoleController {

  constructor(private readonly roleService: RoleService) { }

  @Post()
  @UseGuards(AuthenticatedGuard)
  @ApiResponse({ type: RoleDto })
  @Permissions(CREATE_ROLE)
  insert(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.insert(createRoleDto);
  }

  @Get(':id')
  @UseGuards(AuthenticatedGuard)
  @ApiResponse({ type: RoleDto })
  @Permissions(GET_ROLE)
  find(@Param() input: FindOneDto) {
    return this.roleService.find(input);
  }

  @Get()
  @UseGuards(AuthenticatedGuard)
  @ApiResponse({ type: RoleDto })
  @Permissions(GET_ROLE, CREATE_USER, UPDATE_USER)
  findAll(@Query() input: GetRoleDto) {
    return this.roleService.findAll(input);
  }

  @Put()
  @UseGuards(AuthenticatedGuard)
  @ApiResponse({ type: RoleDto })
  @Permissions(UPDATE_ROLE)
  update(@Body() updateRoleDto: UpdateRoleDto) {
    return this.roleService.Update(updateRoleDto);
  }

  @Delete(':id')
  @UseGuards(AuthenticatedGuard)
  @Permissions(DELETE_ROLE)
  delete(@Param() input: FindOneDto) {
    return this.roleService.remove(input);
  }

}
