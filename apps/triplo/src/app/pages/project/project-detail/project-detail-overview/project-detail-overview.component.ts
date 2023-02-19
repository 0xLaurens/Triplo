import {Component, OnInit} from "@angular/core";
import {AuthHttpService} from "../../../../services/authentication/auth-http.service";
import {ProjectInterface, TaskInterface} from "@triplo/models";
import {Observable} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {ProjectHttpService} from "../../../../services/projects/project-http.service";
import {TaskHttpService} from "../../../../services/task/task-http.service";

@Component({
  selector: 'triplo-project-detail-overview',
  templateUrl: './project-detail-overview.component.html',
})
export class ProjectDetailOverviewComponent implements OnInit {
  private userId: string | null;
  project$: Observable<ProjectInterface>
  other = false;
  private projectId: string;
  $tasks: Observable<TaskInterface[]>;

  constructor(
    private authService: AuthHttpService,
    private projectService: ProjectHttpService,
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

    this.project$ = this.projectService.findProjectById(this.projectId)
    this.$tasks = this.taskService.getTopLevelTasks(this.projectId);
  }

}
