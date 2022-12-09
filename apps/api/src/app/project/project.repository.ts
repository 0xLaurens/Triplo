import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {ProjectInterface} from "@triplo/models"
import {Model} from "mongoose";
import { Neo4jService } from "nest-neo4j/dist";


@Injectable()
export class ProjectRepository {
  constructor(
    private readonly neo4jService: Neo4jService,
    @InjectModel('Project') private projectModel: Model<ProjectInterface>
  ) {
  }

  async findAllProjects(): Promise<ProjectInterface[]> {
    return this.projectModel.find();
  }

  async updateProject(projectId: string, project: Partial<ProjectInterface>): Promise<ProjectInterface> {
    await this.neo4jService.write(`MATCH (p:Project {id: "${projectId}"}) SET p.name = "${project.name}"`);
    return this.projectModel.findByIdAndUpdate(projectId, project, {new: true})
  }

  async findProjectById(projectId: string): Promise<ProjectInterface> {
    return this.projectModel.findById(projectId).populate({path: "comments", model: "Comment"})
  }

  async deleteProject(projectId: string): Promise<ProjectInterface> {
    await this.neo4jService.write(`MATCH (p:Project {id: "${projectId}"}) DETACH DELETE (p)`);
    return this.projectModel.findByIdAndDelete(projectId)
  }

  async createProject(project: Partial<ProjectInterface>): Promise<ProjectInterface> {
    const created = new this.projectModel({...project});
    await created.save();
    await this.neo4jService.write(`CREATE (p:Project {id: "${created._id}", name: "${created.name}"})`);
    return created
  }
}
