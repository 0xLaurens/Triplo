import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {v4 as uuid} from "uuid";
import {gender} from "@triplo/models"

@Schema()
export class User {
  @Prop({default: uuid, index: true})
  _id: string;

  @Prop({required: true, unique: true})
  username: string;

  @Prop({required: true, unique: true})
  email: string;

  @Prop({type: String, enum: gender, required: true, default: gender.other})
  gender: string;

  @Prop({default: Date.now})
  registered: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
