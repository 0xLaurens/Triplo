import {Component, OnInit} from '@angular/core';
import { gender, User } from "@triplo/models"
import {UserService} from "../../../models/User/user.service";
import {ActivatedRoute, Router} from "@angular/router";


@Component({
  selector: 'triplo-user-edit',
  templateUrl: './user-edit.component.html',
  styles: [],
})
export class UserEditComponent implements OnInit {
  user!: User;
  gender = gender;
  userId!: number;
  userExists = false;

  constructor(
    private readonly userService: UserService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
  ) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.userId = Number(params['id'])
      if (this.userId) {
        this.user = this.userService.GetUser(
          this.userId
        );
        this.userExists = true;
      } else {
        this.user = {
          username: "",
          dob: {year: 2012, month: 10, day: 17},
          email: "",
          gender: gender.other,
          id: 0,
          firstname: "",
          lastname: "",
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
