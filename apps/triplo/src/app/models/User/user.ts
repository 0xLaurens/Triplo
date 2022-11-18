import {NgbDateStruct} from "@ng-bootstrap/ng-bootstrap";

export interface User {
  id: number;
  name: Name;
  gender: string;
  email: string;
  dob: NgbDateStruct;
  registered: Date;
}


export interface Name {
  first: string;
  last: string;
}
