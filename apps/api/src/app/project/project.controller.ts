import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put, UseGuards,
  Headers
} from "@nestjs/common";
import {ProjectRepository} from "./project.repository";
import {ProjectInterface, UserInterface} from "@triplo/models";
import {AuthenticationGuard} from "../guard/authentication.guard";
import {AuthorizationUserGuard} from "../guard/authorization-user.guard";

@UseGuards(AuthenticationGuard, AuthorizationUserGuard)
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

  @Put(":projectId")
  async updateProject(
    @Headers('user') user: UserInterface,
    @Param("projectId") projectId: string,
    @Body() changes: ProjectInterface): Promise<ProjectInterface> {

    return this.projectRepo.updateProject(projectId, changes)
  }

  @Delete(":projectId")
  async deleteProject(@Param("projectId") projectId: string): Promise<ProjectInterface> {
    return this.projectRepo.deleteProject(projectId)
  }
}
