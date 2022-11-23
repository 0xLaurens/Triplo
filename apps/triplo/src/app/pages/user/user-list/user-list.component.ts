import {Component, OnInit} from '@angular/core';
import { UserInterface } from "@triplo/models"
import {UserService} from "../../../models/User/user.service";


@Component({
  selector: 'triplo-user-list',
  templateUrl: './user-list.component.html',
  styles: [],
})
export class UserListComponent implements OnInit {
  users: UserInterface[] = [];

  constructor(public userService: UserService) {
  }

  ngOnInit(): void {
    this.users = this.userService.GetUsers()
  }

  deleteUser(id: string) {
    this.userService.DeleteUser(id);
  }
}
