import {
  IsDate,
  IsMongoId,
  IsString,
} from "class-validator";
import {UserInterface} from "../user/user.interface";

export class InviteInterface{
  @IsString()
  @IsMongoId()
  _id: string;

  @IsMongoId()
  recipient: string | UserInterface;

  @IsString()
  projectName: string;

  @IsMongoId()
  project: string;

  @IsMongoId()
  compositeId?: string;

  @IsString()
  message?: string;

  @IsDate()
  created?: Date
}
