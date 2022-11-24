import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {gender} from "@triplo/models"

@Schema()
export class User {
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
