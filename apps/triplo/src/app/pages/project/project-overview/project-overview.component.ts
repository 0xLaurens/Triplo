import { Component, OnInit } from '@angular/core';
import {ProjectHttpService} from "../../../services/projects/project-http.service";
import {Observable} from "rxjs";
import {ProjectInterface} from "@triplo/models";

@Component({
  selector: 'triplo-project-overview',
  templateUrl: './project-overview.component.html',
  styles: [],
})
export class ProjectOverviewComponent implements OnInit {
  projects$!: Observable<ProjectInterface[]>;
  constructor(private readonly projectService: ProjectHttpService) {}

  ngOnInit(): void {
   this.projects$ = this.projectService.findAllProjects()
  }
}
