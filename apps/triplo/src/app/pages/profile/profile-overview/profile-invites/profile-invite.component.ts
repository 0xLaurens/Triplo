import {Component, OnInit} from "@angular/core";
import {AuthHttpService} from "../../../../services/authentication/auth-http.service";
import {InviteInterface, UserInterface} from "@triplo/models";
import {UserHttpService} from "../../../../services/user/user-http.service";
import {Observable} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {InviteHttpService} from "../../../../services/invites/invite-http.service";

@Component({
  selector: 'triplo-profile-invite',
  templateUrl: './profile-invite.component.html',
})
export class ProfileInviteComponent implements OnInit {
  invites$: Observable<InviteInterface[]>
  private userId: string | null;
  user$: Observable<UserInterface>;
  other = false

  constructor(
    private authService: AuthHttpService,
    private userService: UserHttpService,
    private inviteService: InviteHttpService,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    this.userId = this.authService.getUser()
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.userId = params['id']
      }
    });

    if (this.userId) {
      this.user$ = this.userService.findUserById(this.userId)
      this.invites$ = this.inviteService.getInviteByUserId(this.userId)
    }
  }

  acceptInvite(invite: InviteInterface) {

  }

  rejectInvite(invite: InviteInterface) {

  }
}
