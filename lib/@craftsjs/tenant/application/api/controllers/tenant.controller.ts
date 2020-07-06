import { ApiBearerAuth, ApiTags, ApiResponse } from '@nestjs/swagger';
import { Controller, UseGuards, Body, Post, Get, Query, Put, Delete, Param } from '@nestjs/common';
import { TenantService } from '../services/tenant.service';
import { AuthenticatedGuard } from '../../../../auth/guard/authentication.guard';
import { CreateTenantDto } from '../../dtos/create-tenant.dto';
import { FindOneDto } from '../../../../core/dto/find-one.dto';
import { GetTenantDto } from '../../dtos/get-tenant.dto';
import { UpdateTenantDto } from '../../dtos/update-tenant.dto';
import { TenantDto } from '../../dtos/tenant.dto';
import { TenantAvailableDto } from '../../dtos/tenant-available.dto';
import { CREATE_TENANT, GET_TENANT, UPDATE_TENANT, DELETE_TENANT } from '../../../permission';
import { Permissions } from '../../../../auth/decorators/permission.decorator';

@ApiBearerAuth()
@ApiTags('tenants')
@Controller('tenants')
export class TenantController {

  constructor(private readonly tenantService: TenantService) { }

  @Post()
  @ApiResponse({ type: TenantDto })
  @UseGuards(AuthenticatedGuard)
  @Permissions(CREATE_TENANT)
  insert(@Body() createTenantDto: CreateTenantDto) {
    return this.tenantService.insert(createTenantDto);
  }

  @Get(':id')
  @ApiResponse({ type: TenantDto })
  @UseGuards(AuthenticatedGuard)
  @Permissions(GET_TENANT)
  find(@Param() input: FindOneDto) {
    return this.tenantService.find(input);
  }

  @Get('/findOne/isTenantAvailable')
  @ApiResponse({ type: TenantDto })
  findOne(@Query() input: TenantAvailableDto) {
    return this.tenantService.isTenantAvailable(input);
  }

  @Get()
  @ApiResponse({ type: TenantDto })
  @UseGuards(AuthenticatedGuard)
  @Permissions(GET_TENANT)
  findAll(@Query() input: GetTenantDto) {
    return this.tenantService.findAll(input);
  }

  @Put()
  @ApiResponse({ type: TenantDto })
  @UseGuards(AuthenticatedGuard)
  @Permissions(UPDATE_TENANT)
  update(@Body() updateTenantDto: UpdateTenantDto) {
    return this.tenantService.update(updateTenantDto);
  }

  @Delete(':id')
  @UseGuards(AuthenticatedGuard)
  @Permissions(DELETE_TENANT)
  delete(@Param() input: FindOneDto) {
    return this.tenantService.remove(input);
  }

}
