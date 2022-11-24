import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {v4 as uuid} from "uuid"
import mongoose from "mongoose";

@Schema()
export class Comment {
  @Prop({default: uuid, index: true})
  id: number

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
