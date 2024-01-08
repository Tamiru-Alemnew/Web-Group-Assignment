import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../../src/auth/auth.service';
import { Repository } from 'typeorm';
import { User } from '../../src/auth/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('AuthService', () => {
  let service: AuthService;
  let userRepository: Repository<User>;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: getRepositoryToken(User), useClass: Repository },
        JwtService,
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should sign up a user', async () => {
    const authCredentialsDto = {
      email: 'test@test.com',
      password: 'password',
      role: 'user',
    };
    userRepository.save = jest.fn().mockResolvedValue(undefined);
    service.hashPassword = jest.fn().mockResolvedValue('hashedPassword');
    bcrypt.genSalt = jest.fn().mockResolvedValue('salt');

    await service.signUp(authCredentialsDto);

    expect(userRepository.save).toHaveBeenCalledWith({
      email: authCredentialsDto.email,
      role: authCredentialsDto.role,
      password: 'hashedPassword',
      salt: 'salt',
    });
  });

  it('should log in a user', async () => {
    const authCredentialsDto = {
      email: 'test@test.com',
      password: 'password',
      role: 'user',
    };
    service.validateUserCredentials = jest
      .fn()
      .mockResolvedValue({
        email: authCredentialsDto.email,
        role: authCredentialsDto.role,
      });
    jwtService.sign = jest.fn().mockResolvedValue('accessToken');
    const mockResponse = { cookie: jest.fn() };
    const result = await service.logIn(authCredentialsDto, mockResponse);

    expect(result).toEqual({
      accesToken: 'accessToken',
      role: authCredentialsDto.role,
    });
  });
});
