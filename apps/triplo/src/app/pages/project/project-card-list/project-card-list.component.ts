import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Observable} from "rxjs";
import {ProjectInterface} from "@triplo/models";
import {ProjectHttpService} from "../../../services/projects/project-http.service";

@Component({
  selector: 'triplo-project-card-list',
  templateUrl: './project-card-list.component.html',
  styles: [],
})
export class ProjectCardListComponent implements OnInit {

  @Input()
  project!: ProjectInterface;

  @Output()
  projectChanged = new EventEmitter()

  constructor(private projectService: ProjectHttpService) {
  }

  ngOnInit(): void {
  }

}
