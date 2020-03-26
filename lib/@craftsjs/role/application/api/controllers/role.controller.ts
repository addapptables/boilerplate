import { ApiBearerAuth, ApiTags, ApiResponse } from '@nestjs/swagger';
import { Controller, UseGuards, Body, Post, Get, Query, Put, Delete, Param } from '@nestjs/common';
import { RoleService } from '../services/role.service';
import { AuthenticatedGuard } from '../../../../auth/guard/authentication.guard';
import { CreateRoleDto } from '../../dtos/create-role.dto';
import { FindOneDto } from '../../../../core/dto/find-one.dto';
import { GetRoleDto } from '../../dtos/get-role.dto';
import { UpdateRoleDto } from '../../dtos/update-role.dto';
import { RoleDto } from '../../dtos/role.dto';

@ApiBearerAuth()
@ApiTags('roles')
@Controller('roles')
export class RoleController {

  constructor(private readonly roleService: RoleService) { }

  @Post()
  @UseGuards(AuthenticatedGuard)
  @ApiResponse({ type: RoleDto })
  insert(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.insert(createRoleDto);
  }

  @Get(':id')
  @UseGuards(AuthenticatedGuard)
  @ApiResponse({ type: RoleDto })
  find(@Param() input: FindOneDto) {
    return this.roleService.find(input);
  }

  @Get()
  @UseGuards(AuthenticatedGuard)
  @ApiResponse({ type: RoleDto })
  findAll(@Query() input: GetRoleDto) {
    return this.roleService.findAll(input);
  }

  @Put()
  @UseGuards(AuthenticatedGuard)
  @ApiResponse({ type: RoleDto })
  update(@Body() updateRoleDto: UpdateRoleDto) {
    return this.roleService.Update(updateRoleDto);
  }

  @Delete(':id')
  @UseGuards(AuthenticatedGuard)
  delete(@Param() input: FindOneDto) {
    return this.roleService.remove(input);
  }

}
