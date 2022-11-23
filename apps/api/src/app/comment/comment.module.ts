import {Module} from "@nestjs/common";
import {MongooseModule} from "@nestjs/mongoose";
import {CommentSchema} from "./comment.schema";
import {CommentController} from "./comment.controller";
import {CommentRepository} from "./comment.repository";

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: "Comment", schema: CommentSchema}
    ])
  ],
  controllers: [
    CommentController
  ],
  providers: [
    CommentRepository
  ]
})

export class CommentModule {

}
