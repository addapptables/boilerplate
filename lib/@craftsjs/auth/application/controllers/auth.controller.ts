import { Controller, Request, Post, UseGuards, Get, Body } from '@nestjs/common';
import { ApiTags, ApiBody, ApiBearerAuth, ApiHeader } from '@nestjs/swagger';
import { LoginGuard } from '../../guard/login.guard';
import { AuthService } from '../../services/auth.service';
import { LoginResultDto } from '../dtos/login-result.dto';
import { LoginDto } from '../dtos/login.dto';
import { TENANT_ID } from '../../../config';
import { ImpersonateInput } from '../dtos/login-impersonate-input';
import { AuthenticatedGuard } from '../../guard/authentication.guard';

@ApiBearerAuth()
@ApiHeader({
  name: TENANT_ID,
  description: 'TenantId',
})
@ApiTags('auth')
@Controller('auth')
export class AuthController {

  constructor(private readonly authService: AuthService) { }

  @UseGuards(LoginGuard)
  @Post('login')
  @ApiBody({ type: LoginDto })
  async login(@Request() req) {
    const result = await this.authService.login(req.user);
    return result;
  }

  @UseGuards(AuthenticatedGuard)
  @Post('impersonated')
  @ApiBody({ type: LoginResultDto })
  async accountImpersonated(@Request() req, @Body() impersonatedInput: ImpersonateInput) {
    let bearer = req.get('authorization');
    bearer = bearer.replace('Bearer ', '')
    const result = await this.authService.impersonate(impersonatedInput, bearer);
    return result;
  }

  @UseGuards(AuthenticatedGuard)
  @Get('back-to-impersonate')
  @ApiBody({ type: LoginResultDto })
  async backToImpersonate(@Request() req) {
    let bearer = req.get('authorization');
    bearer = bearer.replace('Bearer ', '')
    const result = await this.authService.backToImpersonate(bearer);
    return result;
  }

  @Post('logout')
  logout(@Request() req: any) {
    req.session.user = null;
    req.session.tenantId = null;
  }

  @Get('login-information')
  getLoginInformation() {
    return this.authService.getLoginInformation();
  }

}
