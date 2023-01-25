import {Component, OnInit} from "@angular/core";
import {AuthHttpService} from "../../../services/authentication/auth-http.service";
import {UserInterface} from "@triplo/models";
import {UserHttpService} from "../../../services/user/user-http.service";
import {Observable} from "rxjs";

@Component({
  selector: 'triplo-profile-overview',
  templateUrl: './profile-overview.component.html',
})
export class ProfileOverviewComponent implements OnInit {
  private userId: string | null;
  user$: Observable<UserInterface>;

  constructor(
    private authService: AuthHttpService,
    private userService: UserHttpService,
  ) {
  }

  ngOnInit(): void {
    this.userId = this.authService.getUser()
    if (this.userId)
      this.user$ = this.userService.findUserById(this.userId)
  }

}
