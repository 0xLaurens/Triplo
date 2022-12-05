import {Body, Controller, Post} from "@nestjs/common";

@Controller("login")
export class AuthController {
  @Post()
  async login(@Body("email") email: string, @Body("password") password: string) {
    return

  }
}
