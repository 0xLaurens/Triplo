import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";


@Schema({versionKey: false})
export class Like {
  @Prop({required:true, index: true})
  projectId: string;
  @Prop({required:true, index: true})
  userId: string;
  @Prop({required: true})
  isPositive: boolean
}

export const LikeSchema = SchemaFactory.createForClass(Like);
LikeSchema.index({project: 1, user: 1}, {unique: true})
