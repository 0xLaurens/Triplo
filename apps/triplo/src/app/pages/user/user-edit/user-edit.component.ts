import {Component, OnInit} from '@angular/core';
import {User} from "../../../models/User/user";
import {UserService} from "../../../models/User/user.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'triplo-user-edit',
  templateUrl: './user-edit.component.html',
  styles: [],
})
export class UserEditComponent implements OnInit {
  user!: User

  constructor(
    private readonly userService: UserService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
  ) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.user = this.userService.GetUser(
        Number(params['id'])
      );
    });
  }

  close() {
    this.router.navigate(['/Users']);
  }

  onSubmit() {
    this.userService.UpdateUser(this.user);
    close()
  }
}
