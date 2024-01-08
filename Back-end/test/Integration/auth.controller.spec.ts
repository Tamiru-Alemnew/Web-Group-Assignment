import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../../src/auth/auth.controller';
import { AuthService } from '../../src/auth/auth.service';
import { AuthCredentialsDto } from '../../src/auth/dto/auth-credentials.dto';
import { User } from '../../src/auth/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { mock } from 'jest-mock-extended';
import { Response } from 'express';
import { UserRole } from '../../src/userRole/role.enum';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;
  let jwtService: JwtService;

 beforeEach(async () => {
   const module: TestingModule = await Test.createTestingModule({
     controllers: [AuthController],
     providers: [
       {
         provide: AuthService,
         useValue: {
           signUp: jest.fn().mockResolvedValue(undefined),
           logIn: jest.fn().mockResolvedValue({ accesToken: 'testToken' }),
           findOne: jest.fn(),
         },
       },
       {
         provide: JwtService,
         useValue: {
           sign: jest.fn().mockReturnValue('mockJwtToken'),
           verify: jest.fn().mockReturnValue({ userId: 1 }),
           verifyAsync: jest.fn(),
         },
       },
     ],
   }).compile();

   authController = module.get<AuthController>(AuthController);
   authService = module.get<AuthService>(AuthService);
   jwtService = module.get<JwtService>(JwtService);
 });

  it('should be defined', () => {
    expect(authController).toBeDefined();
  });

  describe('signUp', () => {
    it('should call AuthService.signUp with correct parameters', async () => {
      const authCredentialsDto: AuthCredentialsDto = {
        email: 'test@test.com',
        password: 'Test@1234',
        role: 'parent',
      };
      await authController.signUp(authCredentialsDto);
      expect(authService.signUp).toHaveBeenCalledWith(authCredentialsDto);
    });
  });

describe('logIn', () => {
  it('should call AuthService.logIn with correct parameters and return the result', async () => {
    const authCredentialsDto: AuthCredentialsDto = {
      email: 'test@test.com',
      password: 'Test@1234',
      role: 'parent',
    };
    // Create a mock Response object
    const mockResponse = mock<Response>();
    const result = await authController.logIn(authCredentialsDto, mockResponse);
    expect(authService.logIn).toHaveBeenCalledWith(
      authCredentialsDto,
      mockResponse,
    );
    expect(result).toEqual({ accesToken: 'testToken' });
  });
});

describe('user', () => {
  it('should return the user without the password', async () => {
    const mockRequest = {
      cookies: {
        jwt: 'mockJwtToken',
      },
    };

    const expectedUser = {
      email: 'test@test.com',
      role: 'parent',
    };

    const mockUser = {
      id: 1,
      email: 'test@test.com',
      password: 'Test@1234',
      role: UserRole.Parent,
      salt: 'randomSalt',
      expenses: [],
      checkPassword: jest.fn().mockResolvedValue(true),
    };

    jest.spyOn(authService, 'findOne').mockResolvedValue(mockUser);
    jest
      .spyOn(jwtService, 'verifyAsync')
      .mockResolvedValue({ email: mockUser.email }); // Add this line

    expect(await authController.user(mockRequest as any)).toEqual(expectedUser);
  });
});
});
