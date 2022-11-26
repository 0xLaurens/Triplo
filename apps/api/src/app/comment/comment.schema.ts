import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import mongoose from "mongoose";

@Schema()
export class Comment {
  @Prop({})
  message: string;

  @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'User'})
  owner: string;

  @Prop({})
  username: string;

  @Prop({})
  LikeCount: number;

  @Prop({})
  DislikeCount: number;
}

export const CommentSchema = SchemaFactory.createForClass(Comment)
