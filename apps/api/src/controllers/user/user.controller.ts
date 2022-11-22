import {Controller, Get} from "@nestjs/common";
import {UserRepository} from "../../repository/user/user.repository";
import {User} from "@triplo/models";

@Controller()
export class UserController {

  constructor(private userRepo: UserRepository) {
  }

  @Get("users")
  async findAllUsers(): Promise<User[]> {
    return this.userRepo.findAllUsers();
  }

}
