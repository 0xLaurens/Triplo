import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import mongoose from "mongoose";

export type ProjectDocument = Project & Document;

@Schema({versionKey: false})
export class Project {
  @Prop({required: true})
  name: string;

  @Prop({default: "No Description"})
  description: string;

  @Prop({type: mongoose.Schema.Types.ObjectId, ref: "User"})
  ownerId: string;

  @Prop()
  members?: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]

  @Prop({default: Date.now})
  created: Date;

  @Prop({default: 0, min: 0})
  LikeCount: number;

  @Prop({default: 0, min: 0})
  DislikeCount: number;

  @Prop({required: true})
  Tags: string[]
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
