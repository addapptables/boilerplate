import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Strategy } from 'passport-local';
import { AuthService } from '../services/auth.service';
import { UserDto } from '../../user';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {

  constructor(private readonly authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<UserDto> {
    const user = await this.authService.validateUser(username, password);
    return user;
  }
}
