import {IsDate, IsEmail, IsEnum, IsJWT, IsMongoId, IsString, Max, Min} from "class-validator";


export enum gender {
  male = "Male",
  female = "Female",
  other = "Other"
}

export class UserRegistration {
  @IsString()
  @Min(4)
  @Max(10)
  username: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsEnum(gender)
  gender: gender;

  @IsDate()
  registered: Date;
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

  @IsString()
  password: string;

  @IsEnum(gender)
  gender: gender;

  @IsDate()
  registered: Date;

  @IsJWT()
  token?: string;
}


