import {
  IsArray,
  IsBoolean,
  IsDate,
  IsInt,
  IsMongoId,
  IsNumber,
  IsString,
  MaxLength,
  Min,
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

  @IsDate()
  created?: Date

  @IsInt()
  @Min(0)
  replyCount: number;

  @IsInt()
  @Min(0)
  likeCount: number;

  @IsInt()
  @Min(0)
  dislikeCount: number;

  @IsArray()
  replies: CommentInterface;

  @IsNumber()
  depth: number;

  @IsBoolean()
  updated: boolean;
}
