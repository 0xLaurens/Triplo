import {
  ArrayMaxSize,
  ArrayUnique,
  IsArray,
  IsDate,
  IsInt,
  IsMongoId,
  IsString,
  MaxLength,
  MinLength
} from "class-validator";

export class ProjectInterface {
  @IsMongoId()
  @IsString()
  _id: string;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  name: string;

  @IsString()
  @MaxLength(1000)
  description: string;

  @IsDate()
  created: Date;

  @IsMongoId()
  ownerId: string;

  @IsArray()
  members?: string[]

  @IsInt()
  LikeCount: number;

  @IsInt()
  DislikeCount: number;

  @IsArray()
  @ArrayMaxSize(5)
  @ArrayUnique({message: "All the tags in the array have to be unique"})
  Tags: string[];
}

