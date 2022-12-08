import {Body, Controller, Delete, Get, Param, Post, Put, UseGuards} from "@nestjs/common";
import {UserRepository} from "./user.repository";
import {UserInterface} from "@triplo/models";
import {AuthGuard} from "../guard/auth.guard";


@UseGuards(AuthGuard)
@Controller("users")
export class UserController {

  constructor(private userRepo: UserRepository) {
  }

  @Post()
  async createUser(@Body() user: UserInterface): Promise<UserInterface> {
    return this.userRepo.createUser(user)
  }

  @Get()
  async findAllUsers(): Promise<UserInterface[]> {
    return this.userRepo.findAllUsers();
  }

  @Get(":userId")
  async findUserById(@Param("userId") userId: string)
    : Promise<UserInterface> {
    return this.userRepo.findUserById(userId);
  }

  @Put(":userId")
  async updateUser(@Param("userId") userId: string, @Body() changes: UserInterface)
    : Promise<UserInterface> {
    return this.userRepo.updateUser(userId, changes);
  }

  @Delete(":userId")
  async deleteUser(@Param("userId") userId: string)
    : Promise<UserInterface> {
    return this.userRepo.deleteUser(userId);
  }
}
