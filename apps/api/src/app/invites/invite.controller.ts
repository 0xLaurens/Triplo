import {Body, Controller, Delete, Get, Param, Post, Put, UseGuards} from "@nestjs/common";
import {InviteRepository} from "./invite.repository";
import {InviteInterface} from "@triplo/models";
import {AuthenticationGuard} from "../guard/authentication.guard";

// @UseGuards(AuthenticationGuard)
@Controller("invite")
export class InviteController {
  constructor(private inviteRepo: InviteRepository) {
  }

  @Post("/user/:userid")
  async createInvite(
    @Param("projectId") projectId: string, @Body() invite: InviteInterface
  ): Promise<InviteInterface> {
    return this.inviteRepo.createInvite(projectId, invite)
  }

  @Get("/:inviteId")
  async getInviteById(@Param("inviteId") inviteId: string): Promise<InviteInterface> {
    return this.inviteRepo.getInviteById(inviteId)
  }

  @Get("/project/:projectId")
  async getInviteByProjectId(@Param("projectId") projectId: string): Promise<InviteInterface[]> {
    return this.inviteRepo.getInviteByProjectId(projectId)
  }

  @Get("/user/:userId")
  async getInviteByUserId(@Param("userId") userId: string): Promise<InviteInterface[]> {
    return this.inviteRepo.getInviteByUserId(userId)
  }

  @Put("/:inviteId")
  async updateInvite(
    @Param("inviteId") inviteId: string,
    @Body() changes: InviteInterface): Promise<InviteInterface> {

    return this.inviteRepo.updateInvite(inviteId, changes)
  }

  @Delete("/:inviteId")
  async deleteInvite(@Param("inviteId") inviteId: string): Promise<InviteInterface> {
    return this.inviteRepo.deleteInvite(inviteId)
  }


}
