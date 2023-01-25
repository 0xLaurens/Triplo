import {Body, Controller, Post} from '@nestjs/common';

import {UserInterface} from '@triplo/models';

import {AuthRepository} from './auth.repository';
import {Token_Identity} from "./identity-token.schema";

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthRepository) {
  }

  @Post('register')
  async register(@Body() credentials: { email: string, password: string, username: string, gender: string }): Promise<UserInterface> {
    return await this.authService.registerUser(credentials.password, credentials.email, credentials.username, credentials.gender);
  }

  @Post('login')
  async login(@Body() credentials: { password: string, email: string }): Promise<Token_Identity> {
    return this.authService.generateToken(credentials.email, credentials.password);
  }
}
