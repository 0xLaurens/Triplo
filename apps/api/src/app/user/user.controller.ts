import {Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards} from "@nestjs/common";
import {UserRepository} from "./user.repository";
import {UserInterface} from "@triplo/models";
import {AuthenticationGuard} from "../guard/authentication.guard";
import {AuthorizationUserGuard} from "../guard/authorization-user.guard";


// @UseGuards(AuthenticationGuard)
@Controller("users")
export class UserController {

  constructor(private userRepo: UserRepository) {
  }

  @Post()
  async createUser(@Body() user: UserInterface): Promise<UserInterface> {
    return this.userRepo.createUser(user)
  }

  @Get()
  async findAllUsers(@Query("search") search?: string): Promise<UserInterface[]> {
    return this.userRepo.findAllUsers(search);
  }

  @Get(":userId")
  async findUserById(@Param("userId") userId: string)
    : Promise<UserInterface> {
    return this.userRepo.findUserById(userId);
  }

  @Put(":userId")
  @UseGuards(AuthorizationUserGuard)
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
