import {
  IsDate,
  IsEmail,
  IsMongoId,
  IsString,
} from "class-validator";

export class InviteInterface{
  @IsString()
  @IsMongoId()
  _id: string;

  @IsEmail()
  recipient: string;

  @IsString()
  subject: string;

  @IsString()
  message: string;

  @IsDate()
  created: Date
}
