import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {ProjectInterface} from "@triplo/models"
import {Model} from "mongoose";

@Injectable()
export class ProjectRepository {
 constructor(@InjectModel('Project') private projectModel: Model<ProjectInterface>) {
 }

  async findAllProjects(): Promise<ProjectInterface[]> {
   return this.projectModel.find();
  }
}
