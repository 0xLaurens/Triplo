import { Body, Controller, HttpException, HttpStatus, Post } from '@nestjs/common';

import { Token } from '@triplo/models';

import { AuthRepository } from './auth.repository';

@Controller()
export class AuthController {
    constructor(private readonly authService: AuthRepository) {}

    @Post('register')
    async register(@Body() credentials: {email: string, password: string, username: string, gender: string}) {
        try {
            await this.authService.registerUser(credentials.password, credentials.email, credentials.username, credentials.gender);
        } catch (e) {
          console.log(e)
        }
    }

    @Post('login')
    async login(@Body() credentials: { password: string, email: string }): Promise<Token> {
        try {
            return {
                token: await this.authService.generateToken(credentials.email, credentials.password)
            };
        } catch (e) {
            throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
        }
    }
}
