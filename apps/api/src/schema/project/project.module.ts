import {Module} from "@nestjs/common";
import {MongooseModule} from "@nestjs/mongoose";
import {ProjectSchema} from "./project.schema";
import {ProjectController} from "../../controllers/project/project.controller";
import {ProjectRepository} from "../../repository/project/project.repository";

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: "Project", schema: ProjectSchema}
    ])
  ],
  controllers: [
    ProjectController
  ],
  providers: [
    ProjectRepository
  ]
})

export class ProjectModule {

}
