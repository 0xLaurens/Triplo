import {Injectable, NestMiddleware} from "@nestjs/common";
import {Request, Response} from "express";
import * as jwt from "jsonwebtoken"

@Injectable()
export class GetUserMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {

    const authJWTToken = req.headers.authorization;
    if (!authJWTToken) {
      next();
      return;
    }

    try {
      const user = jwt.verify(authJWTToken, process.env.JWT_SECRET);
      if (user) {
        req["user"] = user;
      }
    } catch (e) {
      console.log(e)
    }
    next();
  }

}
