import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Headers, Query,
} from "@nestjs/common";
import {ProjectRepository} from "./project.repository";
import {ProjectInterface, UserInterface} from "@triplo/models";
import {InjectToken, Token} from "../auth/token.decorator";

// @UseGuards(AuthenticationGuard)

@Controller("projects")
export class ProjectController {
  constructor(private projectRepo: ProjectRepository) {
  }

  @Post()
  async createProject(
    @Body() project: ProjectInterface, @InjectToken() token: Token
  ): Promise<ProjectInterface> {
    project.ownerId = token.id
    return this.projectRepo.createProject(project);
  }

  @Get()
  async findAllProjects(): Promise<ProjectInterface[]> {
    return this.projectRepo.findAllProjects();
  }

  @Get("user/:userId")
  async findProjectsByUserId(@Param("userId") userId: string): Promise<ProjectInterface[]> {
    return this.projectRepo.findProjectsByUserId(userId);
  }

  @Get(":projectId")
  async findProjectById(@Param("projectId") projectId: string, @Query("members") members: boolean): Promise<ProjectInterface> {
    return this.projectRepo.findProjectById(projectId, members);
  }

  @Put(":projectId")
  async updateProject(
    @Headers('user') user: UserInterface,
    @Param("projectId") projectId: string,
    @Body() changes: ProjectInterface): Promise<ProjectInterface> {
    return this.projectRepo.updateProject(projectId, changes);
  }

  @Delete(":projectId")
  async deleteProject(@Param("projectId") projectId: string): Promise<ProjectInterface> {
    return this.projectRepo.deleteProject(projectId);
  }

  @Post("/:projectId/user/:userId")
  async addMemberToProject(@Param("projectId") projectId: string,@Param("userId") userId: string): Promise<ProjectInterface> {
    return this.projectRepo.addMemberToProject(projectId, userId);
  }

  @Put("/:projectId/user/:userId/remove")
  async removeMemberFromProject(@Param("projectId") projectId: string,@Param("userId") userId: string): Promise<ProjectInterface> {
    return this.projectRepo.removeMemberFromProject(projectId, userId);
  }
}
