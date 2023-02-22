import {Component, OnInit} from "@angular/core";
import {AuthHttpService} from "../../../../services/authentication/auth-http.service";
import {CommentInterface, ProjectInterface, TaskInterface} from "@triplo/models";
import {Observable} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {ProjectHttpService} from "../../../../services/projects/project-http.service";
import {TaskHttpService} from "../../../../services/task/task-http.service";
import {CommentHttpService} from "../../../../services/comments/comment-http.service";

@Component({
  selector: 'triplo-project-detail-overview',
  templateUrl: './project-detail-overview.component.html',
})
export class ProjectDetailOverviewComponent implements OnInit {
  userId: string | null;
  project$: Observable<ProjectInterface>
  other = false;
  private projectId: string;
  $tasks: Observable<TaskInterface[]>;
  comments$: Observable<CommentInterface[]>;
  recentComments: Set<CommentInterface>;

  constructor(
    private authService: AuthHttpService,
    private projectService: ProjectHttpService,
    private commentService: CommentHttpService,
    private taskService: TaskHttpService,
    private readonly route: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    this.userId = this.authService.getUser()
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.projectId = params['id']
      }
    });
    this.recentComments = new Set<CommentInterface>();
    this.project$ = this.projectService.findProjectById(this.projectId)
    this.comments$ = this.commentService.getTopLevelComments(this.projectId)
    this.$tasks = this.taskService.getTopLevelTasks(this.projectId);
  }

  async createComment($event: CommentInterface) {
    await this.commentService.createComment(this.projectId, $event).subscribe(comment => {
        this.recentComments.add(comment)
      }
    )
  }

  reloadReplies() {
    console.log("replies reload")
    this.comments$ = this.commentService.getTopLevelComments(this.projectId)
  }
}
