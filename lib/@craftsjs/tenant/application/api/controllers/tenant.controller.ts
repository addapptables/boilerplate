import { ApiBearerAuth, ApiTags, ApiResponse } from '@nestjs/swagger';
import { Controller, UseGuards, Body, Post, Get, Query, Put, Delete, Param } from '@nestjs/common';
import { TenantService } from '../services/tenant.service';
import { AuthenticatedGuard } from '../../../../auth/guard/authentication.guard';
import { CreateTenantDto } from '../../dtos/create-tenant.dto';
import { FindOneDto } from '../../../../core/dto/find-one.dto';
import { GetTenantDto } from '../../dtos/get-tenant.dto';
import { UpdateTenantDto } from '../../dtos/update-tenant.dto';
import { TenantDto } from '../../dtos/tenant.dto';

@ApiBearerAuth()
@ApiTags('tenants')
@Controller('tenants')
export class TenantController {

  constructor(private readonly tenantService: TenantService) { }

  @Post()
  @ApiResponse({ type: TenantDto })
  @UseGuards(AuthenticatedGuard)
  insert(@Body() createTenantDto: CreateTenantDto) {
    return this.tenantService.insert(createTenantDto);
  }

  @Get(':id')
  @ApiResponse({ type: TenantDto })
  @UseGuards(AuthenticatedGuard)
  find(@Param() input: FindOneDto) {
    return this.tenantService.find(input);
  }

  @Get()
  @ApiResponse({ type: TenantDto })
  @UseGuards(AuthenticatedGuard)
  findAll(@Query() input: GetTenantDto) {
    return this.tenantService.findAll(input);
  }

  @Put()
  @ApiResponse({ type: TenantDto })
  @UseGuards(AuthenticatedGuard)
  update(@Body() updateTenantDto: UpdateTenantDto) {
    return this.tenantService.update(updateTenantDto);
  }

  @Delete(':id')
  @UseGuards(AuthenticatedGuard)
  delete(@Param() input: FindOneDto) {
    return this.tenantService.remove(input);
  }

}
