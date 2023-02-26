import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import { TaskStatus } from "@triplo/models";
import mongoose from "mongoose";


@Schema()
export class Subtask {
  @Prop({required: true})
  name: string;

  @Prop({default: "No task description."})
  description: string;

  @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'User'})
  assigned: string;

  @Prop({})
  username: string;

  @Prop({default: Date.now})
  created: Date;

  @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Project', index: true})
  project: string;

  @Prop({required: true, type: String})
  status: TaskStatus;
}

export const subtaskSchema = SchemaFactory.createForClass(Subtask);

@Schema()
export class Task extends Subtask {
  @Prop({default: [], type: [subtaskSchema]})
  subtasks: [Subtask]
}

export const TaskSchema = SchemaFactory.createForClass(Task)
