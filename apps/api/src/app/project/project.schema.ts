import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {v4 as uuid } from "uuid"

@Schema()
export class Project {
  @Prop({default: uuid, index: true})
  id: string;

  @Prop({required:true})
  name: string;

  @Prop({default: 0})
  LikeCount: number;

  @Prop({default: 0})
  DislikeCount: number;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
