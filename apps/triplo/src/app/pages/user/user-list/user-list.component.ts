import {Component, OnInit} from '@angular/core';
import {User} from "../../../models/User/user";
import {UserService} from "../../../models/User/user.service";


@Component({
  selector: 'triplo-user-list',
  templateUrl: './user-list.component.html',
  styles: [],
})
export class UserListComponent implements OnInit {
  users: User[] = [];

  constructor(public userService: UserService) {
  }

  ngOnInit(): void {
    this.users = this.userService.GetUsers()
  }

  deleteUser(id: number) {
    this.userService.DeleteUser(id);
  }
}
