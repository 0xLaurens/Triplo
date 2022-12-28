import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import mongoose from "mongoose";

export type ProjectDocument = Project & Document;

@Schema({versionKey: false})
export class Project {
  @Prop({required: true})
  name: string;

  @Prop({default: "No Description"})
  description: string;

  @Prop({default: Date.now})
  created: Date;

  @Prop({default: 0})
  LikeCount: number;

  @Prop({default: 0})
  DislikeCount: number;

  @Prop()
  Tags: string[]

  @Prop()
  comments?: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }]
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
