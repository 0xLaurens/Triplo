import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import mongoose from "mongoose";

@Schema()
export class Comment {
  @Prop({type: mongoose.Schema.Types.ObjectId, ref: "Project"})
  project: string;
  @Prop({})
  message: string;

  @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Comment'})
  parent?: string

  @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'User'})
  owner: string;

  @Prop({})
  username: string;

  @Prop({default: Date.now})
  created: Date;

  @Prop({})
  LikeCount: number;

  @Prop({})
  DislikeCount: number;
}

export const CommentSchema = SchemaFactory.createForClass(Comment)
