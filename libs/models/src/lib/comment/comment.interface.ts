import {IsInt, IsMongoId, IsString, MaxLength, Min, MinLength} from "class-validator";

export class CommentInterface {
  @IsString()
  @IsMongoId()
  _id: string;

  @IsString()
  @MaxLength(1000)
  message: string;

  @IsMongoId()
  owner: string;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  username: string;

  @IsInt()
  @Min(0)
  LikeCount: number;

  @IsInt()
  @Min(0)
  DislikeCount: number;
}
