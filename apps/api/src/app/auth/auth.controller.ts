import { Body, Controller, HttpException, HttpStatus, Post } from '@nestjs/common';

import { Token, UserCredentials} from '@triplo/models';

import { AuthRepository } from './auth.repository';

@Controller()
export class AuthController {
    constructor(private readonly authService: AuthRepository) {}

    @Post('register')
    async register(@Body() credentials: UserCredentials) {
        try {
            await this.authService.registerUser(credentials.password, credentials.emailAddress);
        } catch (e) {
            throw new HttpException('Username invalid', HttpStatus.BAD_REQUEST);
        }
    }

    @Post('login')
    async login(@Body() credentials: { password: string; emailAddress: string }): Promise<Token> {
        try {
            return {
                token: await this.authService.generateToken(credentials.emailAddress, credentials.password)
            };
        } catch (e) {
            throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
        }
    }
}
