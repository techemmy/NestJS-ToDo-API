import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entities';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import * as bcrypt from 'bcrypt';

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

    const isCorrectPassword = await bcrypt.compare(pass, user.password);
    if (!user || !isCorrectPassword) {
      throw new UnauthorizedException('Invalid username or password');
    }
    const payload = {
      sub: user.userId,
      username: user.username,
      role: user.role,
    };
    return { access_token: await this.jwtService.signAsync(payload) };
  }

  async signUp(user: CreateUserDto): Promise<User | undefined> {
    const existingUser = await this.usersService.findOne(user.username);
    if (existingUser) {
      throw new UnauthorizedException(
        'Username has been used. Choose another one',
      );
    }
    return this.usersService.create(user);
  }
}
