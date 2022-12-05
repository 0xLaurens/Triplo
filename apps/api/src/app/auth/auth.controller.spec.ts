import { Token } from '@triplo/models';
import { Test, TestingModule } from '@nestjs/testing';

import { AuthController } from './auth.controller';
import {AuthRepository} from "./auth.repository";

describe('AuthController', () => {
  let app: TestingModule;
  let authController: AuthController;
  let authRepo: AuthRepository;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [{ // mock the auth service, to avoid providing its dependencies
        provide: AuthRepository,
        useValue: {
          createUser: jest.fn(),
          registerUser: jest.fn(),
          generateToken: jest.fn(),
        },
      }],
    }).compile();

   authController = app.get<AuthController>(AuthController);
   authRepo = app.get<AuthRepository>(AuthRepository);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('register', () => {
    let exampleUser, exampleId, register, create;

    beforeEach(() => {
      exampleUser = {
        username: 'henk',
        password: 'supersecret123',
        emailAddress: 'henk@henk.nl',
      }
      exampleId = 'id123';

      create = jest.spyOn(authRepo, 'createUser')
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        .mockImplementation(async (_u: string) => {return exampleId;});
    });

    it('should call the register and create method of the auth service on success', async () => {
      register = jest.spyOn(authRepo, 'registerUser')
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        .mockImplementation(async (_u: string, _p: string) => {return;});

      const id = await authController.register(exampleUser);

      expect(register).toHaveBeenCalledWith(exampleUser.password, exampleUser.emailAddress);
      expect(create).toHaveBeenCalledWith(exampleUser.username, exampleUser.emailAddress);
      expect(id).toHaveProperty('id', exampleId);
    });

    it('should not call create on failed register (duplicate username)', async () => {
      register = jest.spyOn(authRepo, 'registerUser')
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        .mockImplementation(async (_u: string, _p: string) => {throw new Error('duplicate user');});

      await expect(authController.register(exampleUser)).rejects.toThrow();
      expect(create).not.toHaveBeenCalled();
    });
  });

  describe('login', () => {
    it('should call the generateToken method of the auth service', async () => {
      const exampleUser = {
        emailAddress: "henk@henk.com",
        password: 'supersecret123',
      };
      const mockedToken: Token = {token: 'mockedToken'};

      const register = jest.spyOn(authRepo, 'generateToken')
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        .mockImplementation(async (_u: string, _p: string) => {return mockedToken.token;});

      expect(await authController.login(exampleUser)).toStrictEqual(mockedToken);

      expect(register).toHaveBeenCalledWith(exampleUser.emailAddress, exampleUser.password);
    });
  });
});
