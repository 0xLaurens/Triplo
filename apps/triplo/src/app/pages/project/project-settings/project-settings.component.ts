import {Component, Inject, Injector, OnInit} from '@angular/core';
import {ProjectHttpService} from "../../../services/projects/project-http.service";
import {LikeInterface, ProjectInterface, TaskInterface, UserInterface} from "@triplo/models";
import {ActivatedRoute, Router} from "@angular/router";
import {PolymorpheusComponent} from '@tinkoff/ng-polymorpheus';
import {Observable} from "rxjs";
import {TaskHttpService} from "../../../services/task/task-http.service";
import {TuiAlertService, TuiNotification} from "@taiga-ui/core";
import {ConfirmAlertComponent} from "../../../shared/alert/confirm/confirm-alert.component";
import {AuthHttpService} from "../../../services/authentication/auth-http.service";

@Component({
  selector: 'triplo-project-settings',
  templateUrl: './project-settings.component.html',
})
export class ProjectSettingsComponent implements OnInit {
  project$!: Observable<ProjectInterface>
  $tasks: Observable<TaskInterface[]>;
  notification: Observable<boolean>
  userId: string | null;
  projectId: string;
  private ownerId: string | UserInterface;
  isOwner = false;

  constructor(
    @Inject(TuiAlertService)
    private readonly alertService: TuiAlertService,
    @Inject(Injector) private readonly injector: Injector,
    private route: ActivatedRoute,
    private router: Router,
    private projectService: ProjectHttpService,
    private taskService: TaskHttpService,
    private authService: AuthHttpService,
  ) {
  }


  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.projectId = params['projectId']
    });
    this.userId = this.authService.getUser()
    this.project$ = this.projectService.findProjectById(this.projectId)
    this.project$.subscribe(p => {
      this.OwnershipCheck(p)
    })
    this.$tasks = this.taskService.getTasksByProjectId(this.projectId);


    this.notification = this.alertService.open<boolean>(
      new PolymorpheusComponent(ConfirmAlertComponent, this.injector),
      {
        label: `Are you sure you would like to delete this project?`,
        status: TuiNotification.Error,
        autoClose: false,
      },
    )
  }

  private OwnershipCheck(project: ProjectInterface): void {
    this.ownerId = project.ownerId
    if (this.ownerId == this.userId) {
      this.isOwner = true
    }
  }

  deleteProject() {
    this.notification.subscribe(confirm => {
      if (confirm) {
        this.projectService.deleteProject(this.projectId).subscribe(
          () => {
            this.alertService.open('Deleted project', {label: "Success!"}).subscribe()
            this.router.navigate(["/Projects"])
          }
        )
      }
    })
  }
}
