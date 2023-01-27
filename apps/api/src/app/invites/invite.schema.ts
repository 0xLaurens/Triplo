import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import mongoose from "mongoose";


@Schema()
export class Invite {
  @Prop({required: true, index: true})
  recipient: string;

  @Prop()
  projectName: string;

  @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Project', index: true})
  project: string;

  @Prop({default: "No subject"})
  subject: string;

  @Prop({default: "No message"})
  message: string;

  @Prop({default: Date.now})
  created: Date;
}

export const InviteSchema = SchemaFactory.createForClass(Invite)
