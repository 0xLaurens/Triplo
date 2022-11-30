import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseFilters
} from "@nestjs/common";
import {ProjectRepository} from "./project.repository";
import {ProjectInterface} from "@triplo/models";
import {HttpExceptionFilter} from "../../filters/http.filter";

@Controller("projects")
export class ProjectController {
  constructor(private projectRepo: ProjectRepository) {
  }

  @Post()
  async createProject(
    @Body() project: ProjectInterface
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

  @UseFilters(HttpExceptionFilter)
  @Put(":projectId")
  async updateProject(
    @Param("projectId") projectId: string,
    @Body() changes: ProjectInterface ): Promise<ProjectInterface> {

    return this.projectRepo.updateProject(projectId, changes)
  }

  @Delete(":projectId")
  async deleteProject(@Param("projectId") projectId: string): Promise<ProjectInterface> {
    return this.projectRepo.deleteProject(projectId)
  }
}
