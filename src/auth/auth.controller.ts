import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UserRole, UserRoles } from 'src/role.decorator';
import { RoleGuard } from 'src/role.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('login')
  signIn(@Body() signInDto: Record<any, any>) {
    return this.authService.signIn(signInDto.username, signInDto.password);
  }

  @Post('signup')
  @UseGuards(RoleGuard)
  @UseGuards(AuthGuard)
  @UserRoles(UserRole.Admin)
  async signUp(@Body() createUserDto: CreateUserDto) {
    const user = await this.authService.signUp(createUserDto);
    return user;
  }

  @Get('profile')
  @UseGuards(AuthGuard)
  getProfile(@Request() req) {
    return req.user;
  }
}
