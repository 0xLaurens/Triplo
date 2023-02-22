import {
  IsArray,
  IsBoolean,
  IsMongoId,
  IsNumber,
  IsString,
  MaxLength,
  MinLength
} from "class-validator";

export class CommentInterface {
  @IsString()
  @IsMongoId()
  _id: string;

  @IsString()
  @IsMongoId()
  project: string;

  @IsString()
  @IsMongoId()
  parent?: string;

  @IsString()
  @MaxLength(1000)
  message: string;

  @IsMongoId()
  owner: string;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  username: string;

  created?: Date

  @IsArray()
  replies: CommentInterface[];

  @IsNumber()
  depth: number;

  @IsBoolean()
  updated: boolean;
}
