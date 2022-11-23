
import {Injectable} from "@angular/core";
import { UserInterface, gender } from "@triplo/models";


@Injectable({
  providedIn: 'root',
})
export class UserService {
  private users: UserInterface[] = [
    {
      id: 1,
      username: "GamerMan",
      firstname: "John",
      lastname: "Doe",
      email: "John@Doe.com",
      dob: {year: 2012, month: 10, day: 17},
      registered: new Date(),
      gender: gender.male,
    },
    {
      id: 2,
      username: "A.Knight",
      firstname: "Avery",
      lastname: "McKnight",
      email: "Avery.McKnight@gmail.com",
      dob: {year: 2001, month: 1, day: 17},
      registered: new Date(),
      gender: gender.female,
    },
    {
      id: 3,
      username: "Pretzel99",
      firstname: "Frans",
      lastname: "German",
      email: "PretzelLover99@gmail.com",
      dob: {year: 1987, month: 8, day: 23},
      registered: new Date(),
      gender: gender.other,
    },
    {
      id: 4,
      username: "Hershey",
      firstname: "Hershey",
      lastname: "Kiss",
      email: "H.Kiss@gmail.com",
      dob: {year: 1999, month: 6, day: 21},
      registered: new Date(),
      gender: gender.female,
    },
    {
      id: 5,
      username: "Kiss",
      firstname: "Albert",
      lastname: "Kiss",
      email: "A.Kiss@gmail.com",
      dob: {year: 2002, month: 2, day: 16},
      registered: new Date(),
      gender: gender.male,
    },
  ];


  GetUsers(): UserInterface[] {
    return this.users;
  }

  GetUser(id: number): UserInterface {
    return this.users.filter(u => u.id == id)[0];
  }


  DeleteUser(id: number): UserInterface[] {
    return this.users.splice(this.users.findIndex(u => u.id == id), 1);
  }

  UpdateUser(updatedUser: UserInterface) {
    const updatedUsers = this.users.filter(
      (user) => user.id !== updatedUser.id
    );
    updatedUsers.push(updatedUser);
    this.users = updatedUsers;
  }

  CreateUser(user: UserInterface) {
    user.id = this.users.length + 1
    this.users.push(user)
  }
}
