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

  async updateProject(projectId: string, project: Partial<ProjectInterface>): Promise<ProjectInterface> {
    return this.projectModel.findByIdAndUpdate(projectId, project, {new: true})
  }

  async findProjectById(projectId: string): Promise<ProjectInterface> {
    return this.projectModel.findById(projectId)
  }

  deleteProject(projectId: string): Promise<ProjectInterface> {
    return this.projectModel.findByIdAndDelete(projectId).exec()
  }

  createProject(project: Partial<ProjectInterface>): Promise<ProjectInterface> {
    return this.projectModel.create(project)
  }
}
