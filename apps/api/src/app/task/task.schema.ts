import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import mongoose from "mongoose";

@Schema()
export class SubTask {
  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop({default: Date.now})
  created: Date;
}

@Schema()
export class Task extends SubTask {
  @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Project', index: true})
  project: string;

  subtasks: [SubTask]
}


export const TaskSchema = SchemaFactory.createForClass(Task)
