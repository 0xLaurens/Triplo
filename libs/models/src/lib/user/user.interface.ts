import {IsDate, IsEmail, IsEnum, IsMongoId, IsString, Max, Min} from "class-validator";


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
  @Min(4)
  @Max(10)
  username: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsEnum(gender)
  gender: gender;

  @IsDate()
  registered: Date;
}


