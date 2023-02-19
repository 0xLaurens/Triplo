import {Component, OnInit} from "@angular/core";
import {AuthHttpService} from "../../../../services/authentication/auth-http.service";
import {ProjectInterface} from "@triplo/models";
import {Observable} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {ProjectHttpService} from "../../../../services/projects/project-http.service";

@Component({
  selector: 'triplo-project-detail-members',
  templateUrl: './project-detail-members.component.html',
})
export class ProjectDetailMembersComponent implements OnInit {
  private userId: string | null;
  project$: Observable<ProjectInterface>
  private projectId: string;

  constructor(
    private authService: AuthHttpService,
    private projectService: ProjectHttpService,
    private readonly route: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    this.userId = this.authService.getUser()
    this.route.parent?.params.subscribe(params => this.projectId = params['id'])
    this.project$ = this.projectService.findProjectById(this.projectId)
  }

}
