import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import { UserInterface } from "@triplo/models"
import {UserService} from "../../../models/User/user.service";

@Component({
  selector: 'triplo-user-detail',
  templateUrl: './user-detail.component.html',
  styles: [],
})
export class UserDetailComponent implements OnInit {
  user?: UserInterface;

  constructor(private route: ActivatedRoute, private readonly userService: UserService, private  router: Router) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.user = this.userService.GetUser(
        params['id']
      );
    });
  }


  close() {
    this.router.navigate(["/Users"])
  }
}
