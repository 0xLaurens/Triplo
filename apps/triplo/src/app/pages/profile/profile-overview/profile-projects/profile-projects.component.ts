import {Component, OnInit} from "@angular/core";
import {AuthHttpService} from "../../../../services/authentication/auth-http.service";
import {UserInterface} from "@triplo/models";
import {UserHttpService} from "../../../../services/user/user-http.service";
import {Observable} from "rxjs";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'triplo-profile-projects',
  templateUrl: './profile-projects.component.html',
})
export class ProfileProjectsComponent implements OnInit {
  private userId: string | null;
  other = false;
  user$: Observable<UserInterface>;

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
        this.other = true
        this.userId = params['id']
      }
    });
    if (this.userId)
      this.user$ = this.userService.findUserById(this.userId)
  }

}
