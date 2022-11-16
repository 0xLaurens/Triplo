import {User} from "./user";
import {Injectable} from "@angular/core";


@Injectable({
  providedIn: 'root',
})
export class UserService {
  private users: User[] = [
    {
      id: 0,
      name: {first: "John", last: "Doe"},
      email: "John@Doe.com",
      dob: new Date(),
      registered: new Date(),
      gender: "male",
    },
    {
      id: 1,
      name: {first: "Avery", last: "McKnight"},
      email: "Avery.McKnight@gmail.com",
      dob: new Date(),
      registered: new Date(),
      gender: "female",
    },
    {
      id: 2,
      name: {first: "Elvis", last: "Pretzel"},
      email: "PretzelLover99@gmail.com",
      dob: new Date(),
      registered: new Date(),
      gender: "male",
    },
    {
      id: 3,
      name: {first: "Hershey", last: "Kiss"},
      email: "H.Kiss@gmail.com",
      dob: new Date(),
      registered: new Date(),
      gender: "female",
    },
    {
      id: 4,
      name: {first: "Albert", last: "Kiss"},
      email: "A.Kiss@gmail.com",
      dob: new Date(),
      registered: new Date(),
      gender: "male",
    },
  ];


  GetUsers(): User[] {
    return this.users;
  }

  GetUser(id: number): User {
    return this.users.filter(u => u.id == id)[0];
  }

  DeleteUser(id: number): User[] {
    return this.users.splice(this.users.findIndex(u => u.id == id), 1);
  }

}
