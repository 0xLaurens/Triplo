import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {ProjectInterface} from "@triplo/models"
import {Model} from "mongoose";
import {Neo4jService} from "nest-neo4j/dist";


@Injectable()
export class ProjectRepository {
  constructor(
    private readonly neo4jService: Neo4jService,
    @InjectModel('Project') private projectModel: Model<ProjectInterface>
  ) {
  }

  async findAllProjects(): Promise<ProjectInterface[]> {
    return this.projectModel.find()
  }

  async updateProject(projectId: string, project: Partial<ProjectInterface>): Promise<ProjectInterface> {
    await this.neo4jService.write(`MATCH (p:Project {id: "${projectId}"}) SET p.name = "${project.name}"`);
    return this.projectModel.findByIdAndUpdate(projectId, project, {new: true})
  }

  async findProjectById(projectId: string, members: boolean): Promise<ProjectInterface> {
    if (!members) {
      return this.projectModel.findById(projectId)
    }

    return this.projectModel.findById(projectId, {ownerId: 1, members: 1}).populate([
      {path: "members", model: "User"},
      {path: "ownerId", model: "User"},
    ])
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

  async addMemberToProject(projectId: string, userId: string): Promise<ProjectInterface> {
    return this.projectModel.findByIdAndUpdate(projectId, {$addToSet: {members: userId}}, {new: true})
  }

  async removeMemberFromProject(projectId: string, userId: string): Promise<ProjectInterface> {
    return this.projectModel.findByIdAndUpdate( projectId, {$pull: {members: userId}}, {new: true});
  }
}
