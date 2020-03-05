import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Controller, UseGuards, Body, Post, Get, Query, Put, Delete, Param } from '@nestjs/common';
import { CreateUserDto, GetUserDto, UpdateUserDto } from '@craftsjs/user';
import { AuthenticatedGuard } from '@craftsjs/auth';
import { FindOneDto, CommandDto } from '@craftsjs/core';
import { mapper } from '@craftsjs/utils';
import { UserService } from '../../services/user.service';

@ApiBearerAuth()
@ApiTags('users')
@Controller('users')
export class UserController {

  constructor(private readonly userService: UserService) { }

  @Post()
  @UseGuards(AuthenticatedGuard)
  insert(@Body() createUserDto: CreateUserDto) {
    return this.userService.insert(createUserDto);
  }

  @Get(':id')
  @UseGuards(AuthenticatedGuard)
  find(@Param() input: FindOneDto) {
    return this.userService.find(mapper(GetUserDto, input));
  }

  @Get()
  @UseGuards(AuthenticatedGuard)
  findAll(@Query() input: GetUserDto) {
    return this.userService.findAll(input);
  }

  @Put()
  @UseGuards(AuthenticatedGuard)
  update(@Body() updateUserDto: UpdateUserDto) {
    return this.userService.Update(updateUserDto);
  }

  @Delete(':id')
  @UseGuards(AuthenticatedGuard)
  delete(@Param() input: FindOneDto) {
    return this.userService.remove(mapper(CommandDto, input));
  }

}
