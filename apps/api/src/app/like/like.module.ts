import {Module} from "@nestjs/common";
import {MongooseModule} from "@nestjs/mongoose";
import {LikeSchema} from "./like.schema";
import {LikeController} from "./like.controller";
import {LikeRepository} from "./like.repository";
import {ProjectSchema} from "../project/project.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: "Like", schema: LikeSchema},
      {name: "Project", schema: ProjectSchema}
    ])
  ],
  controllers: [
    LikeController
  ],
  providers: [
    LikeRepository
  ]
})

export class LikeModule {

}
