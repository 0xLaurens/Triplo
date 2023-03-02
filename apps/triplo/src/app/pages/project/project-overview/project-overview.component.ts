import {Component, OnInit} from '@angular/core';
import {ProjectHttpService} from "../../../services/projects/project-http.service";
import {Observable} from "rxjs";
import {ProjectInterface} from "@triplo/models";
import {AuthHttpService} from "../../../services/authentication/auth-http.service";

@Component({
  selector: 'triplo-project-overview',
  templateUrl: './project-overview.component.html',
  styles: [],
})
export class ProjectOverviewComponent implements OnInit {
  projects$!: Observable<ProjectInterface[]>;
  loggedIn: boolean;
  private user: string | null;

  constructor(private readonly projectService: ProjectHttpService, private readonly authService: AuthHttpService) {
  }

  ngOnInit(): void {
    this.user = this.authService.getUser()
    this.loggedIn = this.user !== null
    this.projects$ = this.projectService.findAllProjects();
  }
}
