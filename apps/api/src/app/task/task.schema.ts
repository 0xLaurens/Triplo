import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import { TaskType } from "@triplo/models";
import mongoose from "mongoose";


@Schema()
export class Subtask {
  @Prop({required: true})
  name: string;

  @Prop({default: "No task description."})
  description: string;

  @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'User'})
  assigned: string;

  @Prop({required: true})
  username: string;

  @Prop({default: Date.now})
  created: Date;

  @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Project', index: true})
  project: string;

  @Prop({required: true})
  type: TaskType;
}

export const subtaskSchema = SchemaFactory.createForClass(Subtask);

@Schema()
export class Task extends Subtask {
  @Prop({default: [[],[],[],[]]})
  subtasks: [Subtask[]]
}

export const TaskSchema = SchemaFactory.createForClass(Task)
