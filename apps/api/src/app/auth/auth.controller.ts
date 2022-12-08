import { Body, Controller, HttpException, HttpStatus, Post } from '@nestjs/common';

import { Token } from '@triplo/models';

import { AuthRepository } from './auth.repository';

@Controller()
export class AuthController {
    constructor(private readonly authService: AuthRepository) {}

    @Post('register')
    async register(@Body() credentials: {email: string, password: string}) {
        try {
            await this.authService.registerUser(credentials.password, credentials.email);
        } catch (e) {
            throw new HttpException('Username invalid', HttpStatus.BAD_REQUEST);
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
