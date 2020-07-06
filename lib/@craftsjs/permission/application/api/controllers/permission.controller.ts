import { Controller, Get, UseGuards, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiResponse } from '@nestjs/swagger';
import { PermissionService } from '../services/permission.service';
import { AuthenticatedGuard } from '../../../../auth/guard/authentication.guard';
import { QueryDto } from '../../../../core/dto/query.dto';
import { PermissionDto } from '../../dtos/permission.dto';

@ApiBearerAuth()
@ApiTags('permissions')
@Controller('permissions')
export class PermissionController {

  constructor(private readonly permissionService: PermissionService) { }

  @Get()
  @UseGuards(AuthenticatedGuard)
  @ApiResponse({ type: PermissionDto })
  findAll(@Query() input: QueryDto) {
    return this.permissionService.findAll(input);
  }
}
