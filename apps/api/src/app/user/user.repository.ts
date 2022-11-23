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

}
