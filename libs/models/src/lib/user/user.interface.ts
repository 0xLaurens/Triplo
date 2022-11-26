export interface UserInterface {
  _id: string;
  username: string;
  email: string;
  gender: gender;
  registered: Date;
}

export enum gender {
  male = "Male",
  female = "Female",
  other = "Other"
}
