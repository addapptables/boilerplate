import { Controller, Request, Post, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBody, ApiBearerAuth, ApiHeader } from '@nestjs/swagger';
import { LoginGuard } from '../../guard/login.guard';
import { AuthService } from '../../services/auth.service';
import { LoginResultDto } from '../dtos/login-result.dto';
import { LoginDto } from '../dtos/login.dto';
import { TENANT_ID } from '../../../config';

@ApiBearerAuth()
@ApiHeader({
  name: TENANT_ID,
  description: 'TenantId',
})
@ApiTags('auth')
@Controller('auth')
export class AuthController {

  constructor(
    private readonly authService: AuthService,
  ) { }

  @UseGuards(LoginGuard)
  @Post('login')
  @ApiBody({ type: LoginDto })
  async login(@Request() req): Promise<LoginResultDto> {
    const result = await this.authService.login(req.user);
    req.session.user = req.user;
    return result;
  }

}
