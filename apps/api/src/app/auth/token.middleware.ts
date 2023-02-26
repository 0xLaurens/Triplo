import {HttpException, HttpStatus, Injectable, NestMiddleware} from '@nestjs/common';
import {NextFunction, Request, Response} from 'express';

import {AuthRepository} from './auth.repository';

@Injectable()
export class TokenMiddleware implements NestMiddleware {
  constructor(private authService: AuthRepository) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.header('authorization');

    if (!authHeader) {
      throw new HttpException('No authorization header', HttpStatus.UNAUTHORIZED);
    }

    try {
      res.locals.token = await this.authService.verifyToken(authHeader);
    } catch (e) {
      throw new HttpException('Token invalid', HttpStatus.UNAUTHORIZED);
    }

    next();
  }
}
