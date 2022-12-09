import {Component, Inject, Injector, OnInit} from '@angular/core';
import {ProjectHttpService} from "../../../services/projects/project-http.service";
import {CommentInterface, ProjectInterface, TaskInterface} from "@triplo/models";
import {ActivatedRoute, Router} from "@angular/router";
import {CommentHttpService} from "../../../services/comments/comment-http.service";
import {PolymorpheusComponent} from '@tinkoff/ng-polymorpheus';
import {Observable, switchMap} from "rxjs";
import {TaskHttpService} from "../../../services/task/task-http.service";
import {TuiAlertService, TuiNotification} from "@taiga-ui/core";
import {ConfirmAlertComponent} from "../../../shared/alert/confirm/confirm-alert.component";

@Component({
  selector: 'triplo-project-detail',
  templateUrl: './project-detail.component.html',
})
export class ProjectDetailComponent implements OnInit {
  project$!: Observable<ProjectInterface>
  recentComments: CommentInterface[] = []
  comments$!: Observable<CommentInterface[]>
  id!: string
  $tasks: Observable<TaskInterface[]>;
  notification: Observable<boolean>

  constructor(
    @Inject(TuiAlertService)
    private readonly alertService: TuiAlertService,
    @Inject(Injector) private readonly injector: Injector,
    private route: ActivatedRoute,
    private router: Router,
    private projectService: ProjectHttpService,
    private commentService: CommentHttpService,
    private taskService: TaskHttpService
  ) {
  }


  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id']
    });

    this.project$ = this.projectService.findProjectById(this.id)
    this.comments$ = this.commentService.getTopLevelComments(this.id)
    this.$tasks = this.taskService.getTopLevelTasks(this.id);


    this.notification = this.alertService.open<boolean>(
      new PolymorpheusComponent(ConfirmAlertComponent, this.injector),
      {
        label: `Are you sure you would like to delete this project?`,
        status: TuiNotification.Error,
        autoClose: false,
      },
    )
  }

  deleteProject() {
    this.notification.subscribe(b => {
      if (b) {
        this.projectService.deleteProject(this.id).subscribe(
          p => {
            this.alertService.open('Deleted project', {label: "Success!"}).subscribe()
            this.router.navigate(["/Projects"])
          }
        )
      }
    })
  }

  back() {
    this.router.navigate(["/Projects"])
  }

  createComment($event: CommentInterface) {
    $event.username = "Monke"
    $event.owner = "638b2dd312a4cfd63a04ba40"
    this.commentService.createComment(this.id, $event).subscribe(data => {
        this.recentComments.push(data)
      }
    );
  }
}
