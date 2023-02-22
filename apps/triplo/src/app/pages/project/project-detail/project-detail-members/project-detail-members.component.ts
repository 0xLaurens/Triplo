import {Component, Inject, Injector, OnInit} from "@angular/core";
import {AuthHttpService} from "../../../../services/authentication/auth-http.service";
import {ProjectInterface, UserInterface} from "@triplo/models";
import {Observable} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {ProjectHttpService} from "../../../../services/projects/project-http.service";
import {TuiAlertService, TuiNotification} from "@taiga-ui/core";
import {PolymorpheusComponent} from "@tinkoff/ng-polymorpheus";
import {ConfirmAlertComponent} from "../../../../shared/alert/confirm/confirm-alert.component";

@Component({
  selector: 'triplo-project-detail-members',
  templateUrl: './project-detail-members.component.html',
})
export class ProjectDetailMembersComponent implements OnInit {
  userId: string | null;
  owner: UserInterface;
  project$: Observable<ProjectInterface>;
  private projectId: string;
  notification: Observable<boolean>;

  constructor(
    @Inject(Injector) private readonly injector: Injector,
    @Inject(TuiAlertService) private alertService: TuiAlertService,
    private authService: AuthHttpService,
    private projectService: ProjectHttpService,
    private readonly route: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    this.userId = this.authService.getUser()
    this.route.parent?.params.subscribe(params => this.projectId = params['id'])
    this.project$ = this.projectService.findProjectById(this.projectId, true)
    this.project$.subscribe((project) => {this.owner = project.ownerId as UserInterface})

    this.notification = this.alertService.open<boolean>(
      new PolymorpheusComponent(ConfirmAlertComponent, this.injector),
      {
        label: `Are you sure you would remove this member`,
        status: TuiNotification.Error,
        autoClose: false,
      },
    )
  }

  removeMember(member: UserInterface) {
    this.notification.subscribe(b => {
      if (b) {
        this.projectService.removeMemberFromProject(this.projectId, member._id).subscribe(() => {
          this.alertService.open(`${member.username} was removed`, {label: "Success!"}).subscribe()
          this.projectService.removeMemberFromProject(this.projectId, member._id).subscribe()
          this.project$ = this.projectService.findProjectById(this.projectId, true)
        })
      }
    })

  }
}
