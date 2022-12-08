import {IsMongoId, IsString} from "class-validator";

export class LikeInterface {
  @IsMongoId()
  @IsString()
  _id: string;

  @IsMongoId()
  @IsString()
  userId: string;

  @IsMongoId()
  @IsString()
  projectId: string;
}
