import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (!user) {
      throw new UnauthorizedException("You don't have a registered account!");
    }
    if (!user || user.password !== pass) {
      throw new UnauthorizedException('Invalid username or password');
    }
    const payload = { sub: user.userId, username: user.username };
    return { access_token: await this.jwtService.signAsync(payload) };
  }
}
