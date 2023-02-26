import {Component, OnInit} from "@angular/core";
import {AuthHttpService} from "../../../../services/authentication/auth-http.service";
import {ProjectInterface, UserInterface} from "@triplo/models";
import {UserHttpService} from "../../../../services/user/user-http.service";
import {Observable} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {ProjectHttpService} from "../../../../services/projects/project-http.service";

@Component({
  selector: 'triplo-profile-projects',
  templateUrl: './profile-projects.component.html',
})
export class ProfileProjectsComponent implements OnInit {
  userId: string | null;
  user$: Observable<UserInterface>;
  projects$: Observable<ProjectInterface[]>

  constructor(
    private authService: AuthHttpService,
    private userService: UserHttpService,
    private projectService: ProjectHttpService,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    this.userId = this.authService.getUser()
    this.route.parent?.params.subscribe(params => {
      if (params['userId']) {
        this.userId = params['userId']
      }
    });
    if (this.userId) {
      this.user$ = this.userService.findUserById(this.userId)
      this.projects$ = this.projectService.findProjectsByUserId(this.userId)
    }

  }

}
