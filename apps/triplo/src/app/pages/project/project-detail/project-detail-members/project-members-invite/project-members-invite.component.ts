import {Component, Inject, OnInit} from "@angular/core";
import {AuthHttpService} from "../../../../../services/authentication/auth-http.service";
import {InviteInterface, ProjectInterface, UserInterface} from "@triplo/models";
import {debounceTime, distinctUntilChanged, Observable} from "rxjs";
import {UserHttpService} from "../../../../../services/user/user-http.service";
import {FormControl, FormGroup} from "@angular/forms";
import {InviteHttpService} from "../../../../../services/invites/invite-http.service";
import {ProjectHttpService} from "../../../../../services/projects/project-http.service";
import {ActivatedRoute, Router} from "@angular/router";
import {TuiAlertService, TuiNotification} from "@taiga-ui/core";

@Component({
  selector: 'triplo-project-detail-members',
  templateUrl: './project-members-invite.component.html',
})
export class ProjectMembersInviteComponent implements OnInit {
  userId: string | null;
  owner: UserInterface;
  users$: Observable<UserInterface[]>;
  usersToInvite: Set<UserInterface>;
  inviteForm: FormGroup;
  private projectId: string;
  project: ProjectInterface;

  constructor(
    @Inject(TuiAlertService) private alertService: TuiAlertService,
    private router: Router,
    private authService: AuthHttpService,
    private userService: UserHttpService,
    private inviteService: InviteHttpService,
    private projectService: ProjectHttpService,
    private readonly route: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    this.userId = this.authService.getUser()
    this.users$ = this.userService.findAllUsers()

    this.route.parent?.parent?.params.subscribe(params => this.projectId = params['id']);
    this.projectService.findProjectById(this.projectId).subscribe(project => this.project = project);

    this.usersToInvite = new Set<UserInterface>();
    this.inviteForm = new FormGroup({
      username: new FormControl("")
    })
    this.inviteForm.valueChanges.pipe(debounceTime(250), distinctUntilChanged()).subscribe(search => this.searchUsers(search.username))
  }

  searchUsers(search: string) {
    this.users$ = this.userService.findAllUsers(search)
  }

  onSelected(user: UserInterface): void {
    this.usersToInvite.add(user)
    this.inviteForm.patchValue({username: ""})
  }

  inviteMembers() {
    this.usersToInvite.forEach(user => {
      this.sendInviteToMember(user)
      this.usersToInvite.delete(user)
    })
  }

  sendInviteToMember(user: UserInterface) {
    const invite: InviteInterface = {
      message: `The owner of ${this.project.name}`,
      project: `${this.project._id}`,
      projectName: `${this.project.name}`,
      recipient: `${user._id}`
    }
    this.inviteService.createInvite(user._id, invite).subscribe(() => {
      this.alertService.open(`${user.username} was invited`, {label: "Success!"}).subscribe()
      this.router.navigate([`/Projects/${this.projectId}/Members`])
    }, error => {
      if (error.status === 409) {
        this.alertService.open(`${user.username} has already been invited`, {
          label: "Warning!",
          status: TuiNotification.Warning
        }).subscribe()
      } else {
        this.alertService.open(`${error.statusText}`, {label: "Error!", status: TuiNotification.Warning}).subscribe()
      }
    })
  }
}
