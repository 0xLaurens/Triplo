export interface UserInterface {
  id: string;
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
