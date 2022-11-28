import {BadRequestException, Body, Controller, Delete, Get, HttpException, Param, Post, Put} from "@nestjs/common";
import {ProjectRepository} from "./project.repository";
import {ProjectInterface} from "@triplo/models";

@Controller("projects")
export class ProjectController {
  constructor(private projectRepo: ProjectRepository) {
  }

  @Post()
  async createProject(
    @Body() project: Partial<ProjectInterface>
  ): Promise<ProjectInterface> {
    return this.projectRepo.createProject(project)
  }

  @Get()
  async findAllProjects(): Promise<ProjectInterface[]> {
    return this.projectRepo.findAllProjects();
  }

  @Get(":projectId")
  async findProjectById(@Param("projectId") projectId: string): Promise<ProjectInterface> {
    return this.projectRepo.findProjectById(projectId)
  }

  @Put(":projectId")
  async updateProject(
    @Param("projectId") projectId: string,
    @Body() changes: Partial<ProjectInterface> ): Promise<ProjectInterface> {

    if (changes._id)
      throw new BadRequestException("Can't update project _id")

    return this.projectRepo.updateProject(projectId, changes)
  }

  @Delete(":projectId")
  async deleteProject(@Param("projectId") projectId: string): Promise<ProjectInterface> {
    return this.projectRepo.deleteProject(projectId)
  }
}
