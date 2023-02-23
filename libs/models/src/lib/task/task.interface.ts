import {IsMongoId, IsString, MaxLength } from "class-validator";

export enum TaskType {
  TODO,
  PROGRESS,
  TESTING,
  DONE,
}

export class SubtaskInterface {
  @IsString()
  @IsMongoId()
  _id?: string;

  @IsString()
  name: string;

  @IsString()
  @MaxLength(1000)
  description:string;

  @IsMongoId()
  assigned: string;

  @IsString()
  username: string;

  created: Date

  @IsString()
  @IsMongoId()
  project: string;

  type: TaskType
}

export class TaskInterface extends SubtaskInterface {
  subtasks: [SubtaskInterface]
}
