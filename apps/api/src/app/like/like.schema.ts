import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import mongoose, {Document} from "mongoose";

export type LikeDocument = Like & Document;

@Schema({versionKey: false})
export class Like {
  @Prop({required: true, index: true, type: mongoose.Schema.Types.ObjectId, ref: 'project'})
  projectId: string;

  @Prop({required: true, default: "No project name"})
  projectName: string;

  @Prop({required: true, index: true, type: mongoose.Schema.Types.ObjectId, ref: 'user'})
  userId: string;
  @Prop({required: true, unique: true})
  compositeId: string
  @Prop({required: true, type: Boolean})
  isPositive: boolean
}

export const LikeSchema = SchemaFactory.createForClass(Like);
