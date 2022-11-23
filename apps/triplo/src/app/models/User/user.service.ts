
import {Injectable} from "@angular/core";
import { UserInterface, gender } from "@triplo/models";
import {v4 as uuid} from "uuid";


@Injectable({
  providedIn: 'root',
})
export class UserService {
  private users: UserInterface[] = [
    {
      id: uuid(),
      username: "GamerMan",
      email: "John@Doe.com",
      registered: new Date(),
      gender: gender.male,
    },
    {
      id: uuid(),
      username: "A.Knight",
      email: "Avery.McKnight@gmail.com",
      registered: new Date(),
      gender: gender.female,
    },
    {
      id: uuid(),
      username: "Pretzel99",
      email: "PretzelLover99@gmail.com",
      registered: new Date(),
      gender: gender.other,
    },
    {
      id: uuid(),
      username: "Hershey",
      email: "H.Kiss@gmail.com",
      registered: new Date(),
      gender: gender.female,
    },
    {
      id: uuid(),
      username: "Kiss",
      email: "A.Kiss@gmail.com",
      registered: new Date(),
      gender: gender.male,
    },
  ];


  GetUsers(): UserInterface[] {
    return this.users;
  }

  GetUser(id: string): UserInterface {
    return this.users.filter(u => u.id == id)[0];
  }


  DeleteUser(id: string): UserInterface[] {
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
    user.id = uuid();
    this.users.push(user)
  }
}
