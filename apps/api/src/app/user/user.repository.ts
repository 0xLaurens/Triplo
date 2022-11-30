import {Injectable} from "@nestjs/common";
import {UserInterface} from "@triplo/models";
import {Model} from "mongoose";
import {InjectModel} from "@nestjs/mongoose";

@Injectable()
export class UserRepository {

  constructor(@InjectModel('User') private userModel: Model<UserInterface>) {
  }

  async findAllUsers(): Promise<UserInterface[]> {
    return this.userModel.find()
  }

  async createUser(user: UserInterface): Promise<UserInterface> {
    return this.userModel.create(user);
  }

  async findUserById(userId: string): Promise<UserInterface> {
    return this.userModel.findById(userId);
  }

  async updateUser(userId: string, changes: UserInterface): Promise<UserInterface> {
    return this.userModel.findByIdAndUpdate(userId, changes)
  }

  async deleteUser(userId: string): Promise<UserInterface> {
    return this.userModel.findByIdAndDelete(userId)
  }
}
