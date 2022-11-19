import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {User} from "../../../models/User/user";
import {UserService} from "../../../models/User/user.service";

@Component({
  selector: 'triplo-user-detail',
  templateUrl: './user-detail.component.html',
  styles: [],
})
export class UserDetailComponent implements OnInit {
  user!: User;

  constructor(private route: ActivatedRoute, private readonly userService: UserService, private  router: Router) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.user = this.userService.GetUser(
        Number(params['id'])
      );
    });
  }


  close() {
    this.router.navigate(["/Users"])
  }
}
