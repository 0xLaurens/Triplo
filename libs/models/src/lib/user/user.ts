import {NgbDateStruct} from "@ng-bootstrap/ng-bootstrap";

export interface user {
  id: number;
  username: string;
  firstname: string;
  lastname: string;
  gender: gender;
  email: string;
  dob: NgbDateStruct;
  registered: Date;
}

export enum gender {
  male = "Male",
  female = "Female",
  other = "Other"
}
