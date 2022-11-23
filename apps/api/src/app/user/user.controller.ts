import {Controller, Get} from "@nestjs/common";
import {UserRepository} from "./user.repository";
import {UserInterface} from "@triplo/models";

@Controller()
export class UserController {

  constructor(private userRepo: UserRepository) {
  }

  @Get("users")
  async findAllUsers(): Promise<UserInterface[]> {
    return this.userRepo.findAllUsers();
  }

}
