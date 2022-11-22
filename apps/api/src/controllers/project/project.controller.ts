import {Controller, Get} from "@nestjs/common";
import {ProjectRepository} from "../../repository/project/project.repository";
import {Project} from "@triplo/models";

@Controller()
export class ProjectController {
  constructor(private projectRepo: ProjectRepository) {
  }

  @Get("projects")
  async findAllProjects(): Promise<Project[]> {
    return this.projectRepo.findAllProjects();
  }
}
