import {
  IsDate,
  IsMongoId,
  IsString,
} from "class-validator";

export class InviteInterface{
  @IsString()
  @IsMongoId()
  _id?: string;

  @IsMongoId()
  recipient: string;

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
