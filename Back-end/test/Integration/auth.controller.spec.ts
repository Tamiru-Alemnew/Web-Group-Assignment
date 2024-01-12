import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../../src/auth/auth.controller';
import { AuthService } from '../../src/auth/auth.service';
import { AuthCredentialsDto } from '../../src/auth/dto/auth-credentials.dto';
import { User } from '../../src/auth/entities/user.entity';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            signUp: jest.fn().mockResolvedValue(undefined),
            logIn: jest.fn().mockResolvedValue({ accesToken: 'testToken' }),
            getUser: jest.fn().mockResolvedValue(new User()),
          },
        },
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
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
      const result = await authController.logIn(authCredentialsDto);
      expect(authService.logIn).toHaveBeenCalledWith(authCredentialsDto);
      expect(result).toEqual({ accesToken: 'testToken' });
    });
  });

  describe('getUser', () => {
    it('should return the user', async () => {
      const user = new User();
      expect(await authController.getUser(user)).toEqual({ user: user });
    });
  });
});
