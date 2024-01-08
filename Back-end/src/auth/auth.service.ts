import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const user: User = new User();

    user.salt = await bcrypt.genSalt();
    user.email = authCredentialsDto.email;
    user.role = authCredentialsDto.role;
    user.password = await this.hashPassword(
      authCredentialsDto.password,
      user.salt,
    );
    try {
      await this.userRepository.save(user);
    } catch (error) {
      if (error.code == '23505') {
        throw new ConflictException(
          `User with the email ${user.email} already exists.`,
        );
      } else {
        console.log(error);
        throw new InternalServerErrorException();
      }
    }
  }

  async logIn(
    authCredentialsDto: AuthCredentialsDto,
    response,
  ): Promise<{ accesToken: string; role: string }> {
    const { email, role } =
      await this.validateUserCredentials(authCredentialsDto);

    if (!email) {
      throw new UnauthorizedException(`Something went wrong`);
    }

    const payload: JwtPayload = { email };
    const accesToken = await this.jwtService.sign(payload);

    response.cookie('auth', accesToken, {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
      })
    return { accesToken, role };
  }

  async validateUserCredentials(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ email: string; role: string }> {
    let { email, password } = authCredentialsDto;

    const user: User = await this.userRepository.findOne({
      where: { email },
    });

    if (user && (await user.checkPassword(password))) {
      return { email: user.email, role: user.role };
    } else {
      return { email: null, role: null };
    }
  }

  async hashPassword(password: string, salt: string): Promise<string> {
    return await bcrypt.hash(password, salt);
  }

  async findOne(email: any): Promise<User> {
     const user: User = await this.userRepository.findOne({
       where: { email },
     });
    return user;
  }
}
