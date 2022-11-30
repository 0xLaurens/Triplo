import {ArrayMaxSize, ArrayUnique, IsArray, IsDate, IsInt, IsMongoId, IsString, Max, Min} from "class-validator";

export class ProjectInterface {
  @IsMongoId()
  @IsString()
  _id: string;

  @IsString()
  @Max(100)
  name: string;

  @IsString()
  @Max(1000)
  description: string;

  @IsDate()
  created: Date;

  @IsInt()
  LikeCount: number;

  @IsInt()
  DislikeCount: number;

  @IsArray()
  @IsMongoId({each: true})
  comments: string[]

  @IsArray()
  @ArrayMaxSize(5)
  @ArrayUnique({message: "All the tags in the array have to be unique"})
  Tags: string[];
}

