import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {InviteInterface} from "@triplo/models";
import {Model} from "mongoose";

@Injectable()
export class InviteRepository {
  constructor(
    @InjectModel('Invite') private inviteModel: Model<InviteInterface>,
  ) {
  }

  async updateInvite(inviteId: string, invite: Partial<InviteInterface>): Promise<InviteInterface> {
    return this.inviteModel.findByIdAndUpdate(inviteId, invite, {new: true})
  }

  async getInviteByProjectId(projectId: string): Promise<InviteInterface[]> {
    return this.inviteModel.find({project: projectId})
  }

  async getInviteByUserId(userId: string): Promise<InviteInterface[]> {
    return this.inviteModel.find({recipient: userId})
  }

  async deleteInvite(inviteId: string): Promise<InviteInterface> {
    return this.inviteModel.findByIdAndDelete(inviteId)
  }

  async createInvite(userId: string, invite: Partial<InviteInterface>): Promise<InviteInterface> {
    invite.recipient = userId
    return this.inviteModel.create(invite)
  }

  async getInviteById(inviteId: string) {
    return this.inviteModel.findById(inviteId);
  }
}
