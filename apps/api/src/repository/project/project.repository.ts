import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {Project} from "@triplo/models"
import {Model} from "mongoose";

@Injectable()
export class ProjectRepository {
 constructor(@InjectModel('Project') private projectModel: Model<Project>) {
 }

  async findAllProjects(): Promise<Project[]> {
   return this.projectModel.find();
  }
}
