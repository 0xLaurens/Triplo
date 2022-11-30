import {IsArray, IsDate, IsInt, IsMongoId, IsString, MaxLength, Min, MinLength} from "class-validator";

export class CommentInterface {
  @IsString()
  @IsMongoId()
  _id: string;

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

  @IsArray()
  comments: string[]

  @IsInt()
  @Min(0)
  LikeCount: number;

  @IsInt()
  @Min(0)
  DislikeCount: number;
}
