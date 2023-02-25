import {Component, OnInit} from "@angular/core";
import {AuthHttpService} from "../../../services/authentication/auth-http.service";
import {UserInterface} from "@triplo/models";
import {UserHttpService} from "../../../services/user/user-http.service";
import {Observable} from "rxjs";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'triplo-profile-overview',
  templateUrl: './profile-overview.component.html',
})
export class ProfileOverviewComponent implements OnInit {
  private userId: string | null;
  user$: Observable<UserInterface>;
  other = false;

  constructor(
    private authService: AuthHttpService,
    private userService: UserHttpService,
    private readonly route: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    this.userId = this.authService.getUser()
    this.route.params.subscribe(params => {
      if (params['userId']) {
        this.userId = params['userId']
        this.other = true
      }
    });

    if (this.userId)
      this.user$ = this.userService.findUserById(this.userId)
  }

}
