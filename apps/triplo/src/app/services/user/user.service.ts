import { UserInterface, gender } from "@triplo/models";
import {v4 as uuid} from "uuid";

export class UserService {
  private users: UserInterface[] = [
    {
      _id: uuid(),
      username: "GamerMan",
      email: "John@Doe.com",
      password: "aaaaaa",
      registered: new Date(),
      gender: gender.male,
    },
    {
      _id: uuid(),
      username: "A.Knight",
      email: "Avery.McKnight@gmail.com",
      password: "aaaaaa",
      registered: new Date(),
      gender: gender.female,
    },
    {
      _id: uuid(),
      username: "Pretzel99",
      email: "PretzelLover99@gmail.com",
      registered: new Date(),
      password: "aaaaaa",
      gender: gender.other,
    },
    {
      _id: uuid(),
      username: "Hershey",
      email: "H.Kiss@gmail.com",
      password: "aaaaaa",
      registered: new Date(),
      gender: gender.female,
    },
    {
      _id: uuid(),
      username: "Kiss",
      email: "A.Kiss@gmail.com",
      password: "aaaaaa",
      registered: new Date(),
      gender: gender.male,
    },
  ];


  GetUsers(): UserInterface[] {
    return this.users;
  }

  GetUser(id: string): UserInterface {
    return this.users.filter(u => u._id == id)[0];
  }


  DeleteUser(id: string): UserInterface[] {
    return this.users.splice(this.users.findIndex(u => u._id == id), 1);
  }

  UpdateUser(updatedUser: UserInterface) {
    const updatedUsers = this.users.filter(
      (user) => user._id !== updatedUser._id
    );
    updatedUsers.push(updatedUser);
    this.users = updatedUsers;
  }

  CreateUser(user: UserInterface) {
    user._id = uuid();
    this.users.push(user)
  }
}
