import {Module} from "@nestjs/common";
import {MongooseModule} from "@nestjs/mongoose";
import {subtaskSchema, InviteSchema} from "./task.schema";
import {TaskController} from "./task.controller";
import {InviteRepository} from "./task.repository";

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: "Task", schema: InviteSchema},
      {name: "Subtask", schema: subtaskSchema}
    ])
  ],
  controllers: [
    TaskController
  ],
  providers: [
    InviteRepository
  ]
})

export class InviteModule {

}
