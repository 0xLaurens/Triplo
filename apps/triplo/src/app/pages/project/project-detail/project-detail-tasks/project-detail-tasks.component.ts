import {Component, OnInit} from "@angular/core";
import {AuthHttpService} from "../../../../services/authentication/auth-http.service";
import {TaskInterface} from "@triplo/models";
import {Observable} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {ProjectHttpService} from "../../../../services/projects/project-http.service";
import {TaskHttpService} from "../../../../services/task/task-http.service";
import {CommentHttpService} from "../../../../services/comments/comment-http.service";

@Component({
  selector: 'triplo-project-detail-tasks',
  templateUrl: './project-detail-tasks.component.html',
})
export class ProjectDetailTasksComponent implements OnInit {
  userId: string | null;
  other = false;
  private projectId: string;
  $tasks: Observable<TaskInterface[]>;

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
    this.route.parent?.params.subscribe(params => {
      if (params['projectId']) {
        this.projectId = params['projectId']
      }
    });
    this.$tasks = this.taskService.getTasksByProjectId(this.projectId);
  }

  reloadTasks() {
    this.$tasks = this.taskService.getTasksByProjectId(this.projectId);
  }
}
