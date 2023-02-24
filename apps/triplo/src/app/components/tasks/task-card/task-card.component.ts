import {Component, Input, ViewEncapsulation} from '@angular/core';
import {TaskInterface} from "@triplo/models";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'triplo-task-card',
  templateUrl: './task-card.component.html',
  styles: [],
  encapsulation: ViewEncapsulation.Emulated,
})
export class TaskCardComponent {
  constructor(
    public route: ActivatedRoute,
    private router: Router) {
  }

  @Input() subtask = false;
  @Input() task: TaskInterface

  navigate() {
    if (this.subtask) {
      this.router.navigate([`Subtask/${this.task._id}`], {relativeTo: this.route})
    } else {
      this.router.navigate([`./${this.task._id}`], {relativeTo: this.route})
    }
  }

}
