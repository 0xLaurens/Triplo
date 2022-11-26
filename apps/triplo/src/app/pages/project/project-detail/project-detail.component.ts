import {Component, OnInit} from '@angular/core';
import {ProjectHttpService} from "../../../services/projects/project-http.service";
import {ProjectInterface} from "@triplo/models";
import {ActivatedRoute, Router} from "@angular/router";
import {Observable} from "rxjs";

@Component({
  selector: 'triplo-project-detail',
  templateUrl: './project-detail.component.html',
  styles: [],
})
export class ProjectDetailComponent implements OnInit {
  project$!: Observable<ProjectInterface>
  id!: string

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private projectService: ProjectHttpService
  ) {}


  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id']
      this.project$ = this.projectService.findProjectById(this.id)
    });
  }

  deleteProject() {
    this.projectService.deleteProject(this.id).subscribe(
      p => {
        this.router.navigate(["/Projects"])
      }
    )
  }

  back() {
    this.router.navigate(["/Projects"])
  }
}
