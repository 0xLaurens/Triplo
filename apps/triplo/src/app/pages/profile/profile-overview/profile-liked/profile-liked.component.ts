import {Component, OnInit} from "@angular/core";
import {AuthHttpService} from "../../../../services/authentication/auth-http.service";
import {LikeInterface, UserInterface} from "@triplo/models";
import {UserHttpService} from "../../../../services/user/user-http.service";
import {Observable} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {LikeHttpService} from "../../../../services/likes/like-http.service";

@Component({
  selector: 'triplo-profile-liked',
  templateUrl: './profile-liked.component.html',
})
export class ProfileLikedComponent implements OnInit {
  private userId: string | null;
  user$: Observable<UserInterface>;
  likes$: Observable<LikeInterface[]>;

  constructor(
    private authService: AuthHttpService,
    private userService: UserHttpService,
    private likeService: LikeHttpService,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    this.userId = this.authService.getUser()
    this.route.parent?.params.subscribe(params => {
        if (params['id']) {
          this.userId = params['id']
        }
      }
    )
    if (this.userId) {
      this.user$ = this.userService.findUserById(this.userId)
      this.likes$ = this.likeService.findLikesByUserId(this.userId)
    }
  }

}
