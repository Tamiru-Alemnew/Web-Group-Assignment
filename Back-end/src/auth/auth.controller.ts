import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Post,
  Req,
  UnauthorizedException,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './entities/user.entity';
import { GetUser } from './get-user.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signUp(
    @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto,
  ): Promise<void> {
    return this.authService.signUp(authCredentialsDto);
  }

  @Post('login')
  async logIn(
    @Body() authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accesToken: string }> {
    return await this.authService.logIn(authCredentialsDto);
  }

  @Get('user')
  async getUser(@GetUser() user: User) {
    try {
      return { user: user };
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Error getting user');
    }
  }
}
