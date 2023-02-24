import {Component, Inject, Injectable, OnInit} from '@angular/core';
import {TaskHttpService} from "../../../services/task/task-http.service";
import {ActivatedRoute, Router} from "@angular/router";
import {TaskInterface} from "@triplo/models";
import {Observable} from "rxjs";
import {TuiAlertService} from "@taiga-ui/core";

@Component({
  selector: 'triplo-task-detail',
  templateUrl: './task-detail.component.html',
})
export class TaskDetailComponent implements OnInit {
  task$!: Observable<TaskInterface>
  taskId: string
  subtaskId: string;
  subtaskMode = false;

  constructor(
    @Inject(TuiAlertService) private alertService: TuiAlertService,
    private route: ActivatedRoute,
    private router: Router,
    private taskService: TaskHttpService,
  ) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.taskId = params['taskId']
      this.subtaskId = params['subtaskId']
    });
    if (this.subtaskId) {
      this.subtaskMode = true
      this.task$ = this.taskService.findSubtaskById(this.taskId, this.subtaskId);
    } else {
      this.task$ = this.taskService.getTaskById(this.taskId)
    }

  }

  deleteTask() {
    if (this.subtaskMode) {
      this.taskService.deleteTask(this.subtaskId).subscribe(
        p => {
          this.alertService.open('Deleted subtask!', {label: "Success!"}).subscribe()
          this.router.navigate(["/"])
        }
      )
    } else {
      this.taskService.deleteTask(this.taskId).subscribe(
        p => {
          this.alertService.open('Deleted Task', {label: "Success!"}).subscribe()
          this.router.navigate(["/Tasks"])
        }
      )
    }

  }

  back() {
    this.router.navigate(["/Tasks"])
  }
}
