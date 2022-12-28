import {Injectable} from "@nestjs/common";
import {UserInterface} from "@triplo/models";
import {Model} from "mongoose";
import {InjectModel} from "@nestjs/mongoose";
import {Neo4jService} from "nest-neo4j/dist";

@Injectable()
export class UserRepository {

  constructor(
    private readonly neo4jService: Neo4jService,
    @InjectModel('User') private userModel: Model<UserInterface>) {
  }

  async findAllUsers(): Promise<UserInterface[]> {
    return this.userModel.find()
  }

  async createUser(user: Partial<UserInterface>): Promise<UserInterface> {
    const created = new this.userModel({...user})
    await created.save()
    await this.neo4jService.write(`CREATE (u:User {id: "${created._id}", email: "${created.email}", username: "${created.username}"})`)
    return created;
  }

  async findUserById(userId: string): Promise<UserInterface> {
    return this.userModel.findById(userId);
  }

  async updateUser(userId: string, changes: UserInterface): Promise<UserInterface> {
    await this.neo4jService.write(`MATCH (u:User {id: "${userId}"}) SET u += {email: "${changes.email}", username: "${changes.username}"}`)
    return this.userModel.findByIdAndUpdate(userId, changes)
  }

  async deleteUser(userId: string): Promise<UserInterface> {
    await this.neo4jService.write(`MATCH (u:User {id: "${userId}"}) DETACH DELETE (u)`);
    return this.userModel.findByIdAndDelete(userId)
  }
}
