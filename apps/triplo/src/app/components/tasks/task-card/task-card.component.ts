import {Component, EventEmitter, Input, Output, ViewEncapsulation} from '@angular/core';
import {TaskInterface, TaskStatus} from "@triplo/models";
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
  @Output() changeStatus = new EventEmitter<number>();
  statuses = [TaskStatus.TODO, TaskStatus.PROGRESS, TaskStatus.TESTING, TaskStatus.DONE]

  navigate() {
    if (this.subtask) {
      this.router.navigate([`Subtask/${this.task._id}`], {relativeTo: this.route})
    } else {
      this.router.navigate([`./${this.task._id}`], {relativeTo: this.route})
    }
  }

  left() {
    let index = this.statuses.indexOf(this.task.status)
    if (index > 0) index--
    this.task.status = this.statuses[index]
  }

  right() {
    let index = this.statuses.indexOf(this.task.status)
    if (index < 4) index++
    this.changeStatus.emit(index)
    this.task.status = this.statuses[index]
  }

}
