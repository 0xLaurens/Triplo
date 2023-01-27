import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import mongoose from "mongoose";


@Schema()
export class Subtask {
  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop({default: Date.now})
  created: Date;


  @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Project', index: true})
  project: string;
}

export const subtaskSchema = SchemaFactory.createForClass(Subtask);

@Schema()
export class Task extends Subtask {
  @Prop({type: [subtaskSchema]})
  subtasks: [Subtask]
}

export const InviteSchema = SchemaFactory.createForClass(Task)
