import {Component, EventEmitter, Inject, Injector, Input, OnInit, Output} from "@angular/core";
import {ProjectInterface, UserInterface} from "@triplo/models";
import {Observable} from "rxjs";
import {TuiAlertService, TuiNotification} from "@taiga-ui/core";
import {PolymorpheusComponent} from "@tinkoff/ng-polymorpheus";
import {AuthHttpService} from "../../services/authentication/auth-http.service";
import {ProjectHttpService} from "../../services/projects/project-http.service";
import {ConfirmAlertComponent} from "../../shared/alert/confirm/confirm-alert.component";

@Component({
  selector: 'triplo-members',
  templateUrl: './members.component.html',
})
export class MembersComponent implements OnInit {
  @Input() projectId: string;
  @Input() managementMode: boolean;
  userId: string | null;
  owner: UserInterface;
  project$: Observable<ProjectInterface>;
  notification: Observable<boolean>;

  constructor(
    @Inject(Injector) private readonly injector: Injector,
    @Inject(TuiAlertService) private alertService: TuiAlertService,
    private authService: AuthHttpService,
    private projectService: ProjectHttpService,
  ) {
  }

  ngOnInit(): void {
    this.userId = this.authService.getUser()
    this.project$ = this.projectService.findProjectById(this.projectId, true)
    this.project$.subscribe((project) => {
      this.owner = project.ownerId as UserInterface
    })

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
        })
      }
    })
  }
}
