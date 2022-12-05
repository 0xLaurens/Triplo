import {IsDate,  IsMongoId, IsString, MaxLength } from "class-validator";

export class TaskInterface {
  @IsString()
  @IsMongoId()
  _id: string;

  @IsString()
  name: string;

  @IsString()
  @MaxLength(1000)
  description:string;

  @IsString()
  @IsMongoId()
  project: string;

  @IsDate()
  created?: Date

  subtasks: TaskInterface[]
}
