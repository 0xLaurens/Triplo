import {Controller, Get} from "@nestjs/common";
import {ProjectRepository} from "./project.repository";
import {ProjectInterface} from "@triplo/models";

@Controller()
export class ProjectController {
  constructor(private projectRepo: ProjectRepository) {
  }

  @Get("projects")
  async findAllProjects(): Promise<ProjectInterface[]> {
    return this.projectRepo.findAllProjects();
  }
}
