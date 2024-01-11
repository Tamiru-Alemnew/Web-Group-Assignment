import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Patch,
  Post,
  Req,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './entities/user.entity';
import { GetUser } from './get-user.decorator';
import { Request, Response } from 'express';
import { JwtService } from '@nestjs/jwt';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
  ) {}
  @Post('signup')
  signUp(@Body() authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.authService.signUp(authCredentialsDto);
  }

  @Post('login')
  async logIn(
    @Body() authCredentialsDto: AuthCredentialsDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<{ accesToken: string }> {
    return await this.authService.logIn(authCredentialsDto, response);
  }

  @Get('user')
  async user(@Req() request: Request) {
    try {
      const cookie = request.cookies['jwt'];

      const data = await this.jwtService.verifyAsync(cookie);
      if (!data) {
        console.log('no data');
        throw new UnauthorizedException();
      }
      const email = data['email'];
      const user = await this.authService.findOne(email);
      const { id, password, salt, expenses, checkPassword, ...result } = user;

      return result;
    } catch (e) {
      throw new UnauthorizedException();
    }
  }

  @Get('getallUsers')
  async getAllUsers(): Promise<User[]> {
    return await this.authService.getAllUsers();
  }
  @Patch('updateRole')
  async updateRole(
    @Body('id') id: any,
    @Body('role') role: any,
  ): Promise<void> {
    return await this.authService.updateRole(id, role);
  }
}
