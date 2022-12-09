import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";


@Schema({versionKey: false})
export class Like {
  @Prop({required:true})
  projectId: string;
  @Prop({required:true})
  userId: string;
  @Prop({required: true, unique: true})
  compositeId:string
  @Prop({required: true})
  isPositive: boolean
}
export const LikeSchema = SchemaFactory.createForClass(Like);
