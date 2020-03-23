import { ApiBearerAuth, ApiTags, ApiResponse } from '@nestjs/swagger';
import { Controller, UseGuards, Body, Post, Get, Query, Put, Delete, Param } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { AuthenticatedGuard } from '@craftsjs/auth/guard/authentication.guard';
import { CreateUserDto } from '../../dtos/create-user.dto';
import { FindOneDto } from '@craftsjs/core/dto/find-one.dto';
import { GetUserDto } from '../../dtos/get-user.dto';
import { UpdateUserDto } from '../../dtos/update-user.dto';
import { Permissions } from '../../../../auth/decorators/permission.decorator';
import { CREATE_USER, GET_USER, UPDATE_USER, DELETE_USER } from '@craftsjs/user/permission';
import { UserDto } from '../../dtos';
import { FindOneUserDto } from '../../dtos/find-one-user.dto';

@ApiBearerAuth()
@ApiTags('users')
@Controller('users')
export class UserController {

  constructor(private readonly userService: UserService) { }

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
