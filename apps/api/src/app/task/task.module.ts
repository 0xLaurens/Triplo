import {Module} from "@nestjs/common";
import {MongooseModule} from "@nestjs/mongoose";
import {subtaskSchema, TaskSchema} from "./task.schema";
import {TaskController} from "./task.controller";
import {TaskRepository} from "./task.repository";

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: "Task", schema: TaskSchema},
      {name: "Subtask", schema: subtaskSchema}
    ])
  ],
  controllers: [
    TaskController
  ],
  providers: [
    TaskRepository
  ]
})

export class TaskModule {

}
