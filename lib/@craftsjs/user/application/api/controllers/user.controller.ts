import { ApiBearerAuth, ApiTags, ApiResponse } from '@nestjs/swagger';
import { Controller, UseGuards, Body, Post, Get, Query, Put, Delete, Param } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { AuthenticatedGuard } from '../../../../auth/guard/authentication.guard';
import { CreateUserDto } from '../../dtos/create-user.dto';
import { FindOneDto } from '../../../../core/dto/find-one.dto';
import { GetUserDto } from '../../dtos/get-user.dto';
import { UpdateUserDto } from '../../dtos/update-user.dto';
import { Permissions } from '../../../../auth/decorators/permission.decorator';
import { CREATE_USER, GET_USER, UPDATE_USER, DELETE_USER } from '../../../../user/permission';
import { UserDto } from '../../dtos';
import { FindOneUserDto } from '../../dtos/find-one-user.dto';
import { SessionService } from '../../../../auth/services/session.service';
import { UpdateProfileDto } from '../../dtos/update-profile.dto';
import { ChangePasswordDto } from '../../dtos/change-password.dto';
import { UpdateUserOrganizationUnitDto } from '../../dtos/update-user-organization-unit.dto';

@ApiBearerAuth()
@ApiTags('users')
@Controller('users')
export class UserController {

  constructor(
    private readonly userService: UserService,
    private readonly sessionService: SessionService
  ) { }

  @Post()
  @ApiResponse({ type: UserDto })
  @UseGuards(AuthenticatedGuard)
  @Permissions(CREATE_USER)
  insert(@Body() createUserDto: CreateUserDto) {
    return this.userService.insert(createUserDto);
  }

  @Get(':id')
  @ApiResponse({ type: UserDto })
  @UseGuards(AuthenticatedGuard)
  @Permissions(GET_USER)
  find(@Param() input: FindOneUserDto) {
    return this.userService.find(input);
  }

  @Get()
  @ApiResponse({ type: UserDto })
  @UseGuards(AuthenticatedGuard)
  @Permissions(GET_USER)
  findAll(@Query() input: GetUserDto) {
    return this.userService.findAll(input);
  }

  @Get('profile/get')
  @ApiResponse({ type: UserDto })
  @UseGuards(AuthenticatedGuard)
  getProfile() {
    return this.userService.find({ id: this.sessionService.user.id, tenantId: this.sessionService.user.tenantId });
  }

  @Put('update/last-organization-unit')
  @ApiResponse({ type: UserDto })
  @UseGuards(AuthenticatedGuard)
  updateUserOrganizationUnit(@Body() updateUserDto: UpdateUserOrganizationUnitDto) {
    return this.userService.updateUserOrganizationUnit(updateUserDto);
  }

  @Put('profile/update')
  @ApiResponse({ type: UserDto })
  @UseGuards(AuthenticatedGuard)
  updateProfile(@Body() updateUserDto: UpdateProfileDto) {
    return this.userService.updateProfile({
      ...updateUserDto,
      id: this.sessionService.user.id,
      tenantId: this.sessionService.user.tenantId, roles: []
    });
  }

  @Put('profile/update/change-password')
  @ApiResponse({ type: UserDto })
  @UseGuards(AuthenticatedGuard)
  updatePassword(@Body() updateUserDto: ChangePasswordDto) {
    return this.userService.changePassword({
      ...updateUserDto,
      id: this.sessionService.user.id,
    });
  }

  @Put()
  @ApiResponse({ type: UserDto })
  @UseGuards(AuthenticatedGuard)
  @Permissions(UPDATE_USER)
  update(@Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(updateUserDto);
  }

  @Delete(':id')
  @UseGuards(AuthenticatedGuard)
  @Permissions(DELETE_USER)
  delete(@Param() input: FindOneDto) {
    return this.userService.remove(input);
  }

}
