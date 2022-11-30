import {ArrayContains, ArrayMaxSize, ArrayUnique, IsArray, IsDate, IsInt, IsMongoId, IsString} from "class-validator";

export class ProjectInterface {
  @IsMongoId()
  @IsString()
  _id: string;

  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsDate()
  created: Date;

  @IsInt()
  LikeCount: number;

  @IsInt()
  DislikeCount: number;

  @IsArray()
  @IsMongoId({each: true})
  Comments: string[]

  @IsArray()
  @ArrayMaxSize(5)
  @ArrayUnique({message: "All the tags in the array have to be unique"})
  Tags: string[];
}

