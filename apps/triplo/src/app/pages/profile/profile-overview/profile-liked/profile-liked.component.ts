import {Component, OnInit} from "@angular/core";
import {AuthHttpService} from "../../../../services/authentication/auth-http.service";
import {UserInterface} from "@triplo/models";
import {UserHttpService} from "../../../../services/user/user-http.service";
import {Observable} from "rxjs";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'triplo-profile-liked',
  templateUrl: './profile-liked.component.html',
})
export class ProfileLikedComponent implements OnInit {
  private userId: string | null;
  user$: Observable<UserInterface>;
  other = false;

  constructor(
    private authService: AuthHttpService,
    private userService: UserHttpService,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    this.userId = this.authService.getUser()
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.userId = params['id']
        this.other = true
      }
    });
    if (this.userId != null) {
      this.user$ = this.userService.findUserById(this.userId)
    }
  }

}
