import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";


@Schema({versionKey: false})
export class Like {
  @Prop({required:true, index: true})
  project: string;
  @Prop({required:true, index: true})
  user: string;
  @Prop({required: true, default: 0})
  value: number
}

export const LikeSchema = SchemaFactory.createForClass(Like);
LikeSchema.index({project: 1, user: 1}, {unique: true})
