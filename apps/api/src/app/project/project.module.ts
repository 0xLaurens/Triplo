import {Module} from "@nestjs/common";
import {MongooseModule} from "@nestjs/mongoose";
import {ProjectSchema} from "./project.schema";
import {ProjectController} from "./project.controller";
import {ProjectRepository} from "./project.repository";

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
