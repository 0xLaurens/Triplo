import {Component, Input, ViewEncapsulation} from '@angular/core';
import {TaskInterface} from "@triplo/models";

@Component({
  selector: 'triplo-task-card',
  templateUrl: './task-card.component.html',
  styles: [],
  encapsulation: ViewEncapsulation.Emulated,
})
export class TaskCardComponent{
  @Input() task: TaskInterface
}
