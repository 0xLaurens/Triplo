import {Component, OnInit} from '@angular/core';
import { gender, UserInterface } from "@triplo/models"
import {UserService} from "../../../models/User/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {v4 as uuid} from "uuid";


@Component({
  selector: 'triplo-user-edit',
  templateUrl: './user-edit.component.html',
  styles: [],
})
export class UserEditComponent implements OnInit {
  user!: UserInterface;
  gender = gender;
  userId!: string;
  userExists = false;

  constructor(
    private readonly userService: UserService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
  ) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.userId = params['id']
      if (this.userId) {
        this.user = this.userService.GetUser(
          this.userId
        );
        this.userExists = true;
      } else {
        this.user = {
          username: "",
          email: "",
          gender: gender.other,
          id: uuid(),
          registered: new Date,
        }
      }

    });
  }

  close() {
    this.router.navigate(['/Users']);
  }

  onSubmit() {
    if (this.userExists) {
      this.userService.UpdateUser(this.user);
    }
    else {
      this.userService.CreateUser(this.user);
    }

    this.close()
  }
}
