import {Component, Inject, OnInit} from "@angular/core";
import {AuthHttpService} from "../../../../services/authentication/auth-http.service";
import {InviteInterface, UserInterface} from "@triplo/models";
import {UserHttpService} from "../../../../services/user/user-http.service";
import {Observable} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {InviteHttpService} from "../../../../services/invites/invite-http.service";
import {ProjectHttpService} from "../../../../services/projects/project-http.service";
import {TuiAlertService, TuiNotification} from "@taiga-ui/core";

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
    @Inject(TuiAlertService) private alertService: TuiAlertService,
    private authService: AuthHttpService,
    private userService: UserHttpService,
    private projectService: ProjectHttpService,
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
    const userId = invite.recipient as string
    this.projectService.addMemberToProject(invite.project, userId).subscribe(() => {
      this.inviteService.deleteInvite(invite._id).subscribe()
      this.alertService.open(`invite was successfully accepted`, {label: "Success!"}).subscribe()
      this.invites$ = this.inviteService.getInviteByUserId(userId)
    }, error => {
      this.alertService.open(`${error.statusText}`, {label: "Error!", status: TuiNotification.Warning}).subscribe()
    })
  }

  rejectInvite(invite: InviteInterface) {
    const userId = invite.recipient as string
    this.inviteService.deleteInvite(invite._id).subscribe(() => {
      this.inviteService.deleteInvite(invite._id).subscribe()
      this.alertService.open(`invite was successfully rejected`, {label: "Success!"}).subscribe()
      this.invites$ = this.inviteService.getInviteByUserId(userId)
    }, error => {
      this.alertService.open(`${error.statusText}`, {label: "Error!", status: TuiNotification.Warning}).subscribe()
    })
  }
}
