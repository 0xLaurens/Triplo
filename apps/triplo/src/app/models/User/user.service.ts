import {User} from "./user";
import {Injectable} from "@angular/core";
import {NgbDate} from "@ng-bootstrap/ng-bootstrap";


@Injectable({
  providedIn: 'root',
})
export class UserService {
  private users: User[] = [
    {
      id: 1,
      name: {first: "John", last: "Doe"},
      email: "John@Doe.com",
      dob: {year: 2012, month: 10, day: 17},
      registered: new Date(),
      gender: "male",
    },
    {
      id: 2,
      name: {first: "Avery", last: "McKnight"},
      email: "Avery.McKnight@gmail.com",
      dob: {year: 2001, month: 1, day: 17},
      registered: new Date(),
      gender: "female",
    },
    {
      id: 3,
      name: {first: "Elvis", last: "Pretzel"},
      email: "PretzelLover99@gmail.com",
      dob: {year: 1987, month: 8, day: 23},
      registered: new Date(),
      gender: "male",
    },
    {
      id: 4,
      name: {first: "Hershey", last: "Kiss"},
      email: "H.Kiss@gmail.com",
      dob: {year: 1999, month: 6, day: 21},
      registered: new Date(),
      gender: "female",
    },
    {
      id: 5,
      name: {first: "Albert", last: "Kiss"},
      email: "A.Kiss@gmail.com",
      dob: {year: 2002, month: 2, day: 16},
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

  UpdateUser(updatedUser: User) {
    const updatedUsers = this.users.filter(
      (user) => user.id !== updatedUser.id
    );
    updatedUsers.push(updatedUser);
    this.users = updatedUsers;
  }

}
