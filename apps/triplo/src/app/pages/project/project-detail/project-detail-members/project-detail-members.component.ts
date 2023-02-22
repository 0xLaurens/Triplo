import {Component, Inject, Injector, OnInit} from "@angular/core";
import {AuthHttpService} from "../../../../services/authentication/auth-http.service";
import {UserInterface} from "@triplo/models";
import {ActivatedRoute} from "@angular/router";
import {ProjectHttpService} from "../../../../services/projects/project-http.service";
import {TuiAlertService} from "@taiga-ui/core";

@Component({
  selector: 'triplo-project-detail-members',
  templateUrl: './project-detail-members.component.html',
})
export class ProjectDetailMembersComponent implements OnInit {
  userId: string | null;
  owner: UserInterface;
  projectId: string;

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
    this.route.parent?.params.subscribe(params => this.projectId = params['projectId'])
  }
}
