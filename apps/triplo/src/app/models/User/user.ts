export interface User {
  id: number;
  name: Name;
  gender: string;
  email: string;
  dob: Date;
  registered: Date;
}


export interface Name {
  first: string;
  last: string;
}
