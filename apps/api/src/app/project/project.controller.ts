import {Body, Controller, Get, Param, Put} from "@nestjs/common";
import {ProjectRepository} from "./project.repository";
import {ProjectInterface} from "@triplo/models";

@Controller("projects")
export class ProjectController {
  constructor(private projectRepo: ProjectRepository) {
  }

  @Get()
  async findAllProjects(): Promise<ProjectInterface[]> {
    return this.projectRepo.findAllProjects();
  }

  @Put(":projectId")
  async updateCourse(
    @Param("projectId") projectId: string,
    @Body() changes: Partial<ProjectInterface> ): Promise<ProjectInterface> {
    return this.projectRepo.updateProject(projectId, changes)
  }
}
