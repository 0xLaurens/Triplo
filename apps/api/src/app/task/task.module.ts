import {Module} from "@nestjs/common";
import {MongooseModule} from "@nestjs/mongoose";
import {TaskSchema} from "./task.schema";
import {TaskController} from "./task.controller";
import {TaskRepository} from "./task.repository";

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: "Task", schema: TaskSchema}
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
