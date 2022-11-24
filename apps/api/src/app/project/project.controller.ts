import {Body, Controller, Get, Param, Put} from "@nestjs/common";
import {ProjectRepository} from "./project.repository";
import {ProjectInterface} from "@triplo/models";

@Controller()
export class ProjectController {
  constructor(private projectRepo: ProjectRepository) {
  }

  @Get()
  async findAllProjects(): Promise<ProjectInterface[]> {
    return this.projectRepo.findAllProjects();
  }

  @Get("projects/:projectId")
  async findProjectById(@Param("projectId") projectId: string): Promise<ProjectInterface> {
    console.log("Get by id")
    return this.projectRepo.findProjectById(projectId)
  }

  @Put("projects/:projectId")
  async updateCourse(
    @Param("projectId") projectId: string,
    @Body() changes: Partial<ProjectInterface> ): Promise<ProjectInterface> {
    console.log("Updating course...")
    return this.projectRepo.updateProject(projectId, changes)
  }
}
