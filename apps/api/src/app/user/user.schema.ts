import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import { Document } from 'mongoose';
import {gender} from "@triplo/models"

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({required: true, unique: true})
  username: string;

  @Prop({required: true, unique: true})
  email: string;

  @Prop({type: String, enum: gender, required: true, default: gender.other})
  gender: string;

  @Prop()
  passwordHash: string;

  @Prop({default: Date.now})
  registered: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
