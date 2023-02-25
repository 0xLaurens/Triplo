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
import {LikeHttpService} from "../../../services/likes/like-http.service";

@Component({
  selector: 'triplo-project-detail',
  templateUrl: './project-detail.component.html',
})
export class ProjectDetailComponent implements OnInit {
  project$!: Observable<ProjectInterface>
  $tasks: Observable<TaskInterface[]>;
  notification: Observable<boolean>
  userId: string | null;
  projectId: string;
  like$: Observable<LikeInterface>
  private ownerId: string | UserInterface;
  isOwner = false;
  isMember: boolean;

  constructor(
    @Inject(TuiAlertService)
    private readonly alertService: TuiAlertService,
    @Inject(Injector) private readonly injector: Injector,
    private route: ActivatedRoute,
    private router: Router,
    private projectService: ProjectHttpService,
    private taskService: TaskHttpService,
    private authService: AuthHttpService,
    private likeService: LikeHttpService,
  ) {
  }


  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.projectId = params['projectId']
    });
    this.userId = this.authService.getUser()
    this.project$ = this.projectService.findProjectById(this.projectId)
    this.project$.subscribe(p => {
      if (this.userId) {
        this.like$ = this.likeService.findLikeCompositeId(this.userId, this.projectId)
      }
      this.OwnershipCheck(p)
    })
    this.$tasks = this.taskService.getTopLevelTasks(this.projectId);


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

    if (project.members.some(m => m._id === this.userId)) {
      this.isMember = true
    }
  }

  private createLike(isPositive: boolean, projectId: string, userId: string): Partial<LikeInterface> {
    return {
      isPositive: isPositive, projectId: projectId, userId: userId
    }
  }

  updateProjectCounter(isPositive: boolean, increase: number, both?: boolean) {
    this.project$.subscribe(p => {
        if (isPositive) {
          p.LikeCount += increase;
        } else {
          p.DislikeCount += increase;
        }
        if (both) {
          if (isPositive) {
            p.LikeCount += 1
            p.DislikeCount += -1
          } else {
            p.LikeCount += -1
            p.DislikeCount += 1
          }
        }

        if (p.DislikeCount < 0) {
          p.DislikeCount = 0
        }
        if (p.LikeCount < 0) {
          p.LikeCount = 0
        }
        this.project$ = new Observable<ProjectInterface>(o => o.next(p))
      }
    )
  }


  like(isPositive: boolean, like?: LikeInterface) {
    if (this.userId) {
      if (!like) {
        this.likeService.createLike(this.createLike(isPositive, this.projectId, this.userId)).subscribe(l => {
          this.like$ = new Observable<LikeInterface>((o) => o.next(l))
        });
        this.updateProjectCounter(isPositive, 1)
      }

      if (like) {
        if (like.isPositive === isPositive) {
          this.likeService.deleteLike(like._id).subscribe(l => {
            this.like$ = new Observable<LikeInterface>()
            this.updateProjectCounter(isPositive, -1)
          });
        } else {
          like.isPositive = isPositive
          this.likeService.updateLike(like._id, like).subscribe(l => {
            this.like$ = new Observable<LikeInterface>((o) => o.next(l))
          });
          this.updateProjectCounter(isPositive, 0, true)
        }
      }
    }
  }

}
