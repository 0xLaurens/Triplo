import {Injectable} from "@nestjs/common";
import {User} from "@triplo/models";
import {Model} from "mongoose";
import {InjectModel} from "@nestjs/mongoose";

@Injectable()
export class UserRepository {

  constructor(@InjectModel('User') private userModel: Model<User>) {
  }

  async findAllUsers(): Promise<User[]> {
    return this.userModel.find()
  }

}
