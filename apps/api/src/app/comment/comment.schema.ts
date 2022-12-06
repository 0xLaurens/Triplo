import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import mongoose from "mongoose";

@Schema()
export class Comment {
  @Prop({})
  message: string;

  @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Project', index: true})
  project: string;

  @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Comment', index: true})
  parent?: string

  @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'User'})
  owner: string;

  @Prop({})
  username: string;

  @Prop({default: Date.now})
  created: Date;

  @Prop({default: 0})
  replyCount: number;

  @Prop({default: 0})
  likeCount: number;

  @Prop({default: 0})
  dislikeCount: number;
}

export const CommentSchema = SchemaFactory.createForClass(Comment)
