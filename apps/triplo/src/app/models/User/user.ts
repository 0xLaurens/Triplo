import {NgbDateStruct} from "@ng-bootstrap/ng-bootstrap";

export interface User {
  id: number;
  name: Name;
  gender: gender;
  email: string;
  dob: NgbDateStruct;
  registered: Date;
}


export interface Name {
  first: string;
  last: string;
}

export enum gender {
  male = "Male",
  female = "Female",
  other = "Other"
}
