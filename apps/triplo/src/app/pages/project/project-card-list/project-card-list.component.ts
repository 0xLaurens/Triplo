import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ProjectInterface} from "@triplo/models";

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

  constructor() {
  }

  ngOnInit(): void {
  }

}
