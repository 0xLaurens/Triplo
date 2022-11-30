import {IsDate, IsEmail, IsEnum, IsMongoId, IsString} from "class-validator";


export enum gender {
  male = "Male",
  female = "Female",
  other = "Other"
}

export class UserInterface {
  @IsString()
  @IsMongoId()
  _id: string;

  @IsString()
  username: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsEnum(gender)
  gender: gender;

  @IsDate()
  registered: Date;
}


