import {Body, Controller, Delete, Get, Param, Post, Put} from "@nestjs/common";
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
  async updateCourse(
    @Param("projectId") projectId: string,
    @Body() changes: Partial<ProjectInterface> ): Promise<ProjectInterface> {
    return this.projectRepo.updateProject(projectId, changes)
  }

  @Delete(":projectId")
  async deleteCourse(
    @Param("projectId") projectId: string
  ) : Promise<ProjectInterface> {
    return this.projectRepo.deleteCourse(projectId)
  }
}
