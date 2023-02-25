import {Component, Inject, OnInit} from '@angular/core';
import {TaskHttpService} from "../../../services/task/task-http.service";
import {ActivatedRoute, Router} from "@angular/router";
import {TaskInterface, TaskStatus} from "@triplo/models";
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
  statuses = [TaskStatus.TODO, TaskStatus.PROGRESS, TaskStatus.TESTING, TaskStatus.DONE]

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
    this.loadTask()
  }

  loadTask() {
    if (this.subtaskId) {
      this.subtaskMode = true
      this.task$ = this.taskService.findSubtaskById(this.taskId, this.subtaskId);
    } else {
      this.task$ = this.taskService.getTaskById(this.taskId)
    }
  }

  deleteTask() {
    const taskMessage = this.subtaskMode ? "subtask" : "task";
    if (this.subtaskMode)
      this.taskService.deleteSubtask(this.taskId, this.subtaskId).subscribe(() => this.toast(`Deleted ${taskMessage}`));

    if (!this.subtaskMode)
      this.taskService.deleteTask(this.taskId).subscribe(() => this.toast(`Deleted ${taskMessage}`));
  }

  toast(content: string) {
    this.alertService.open(content, {label: "Success!"}).subscribe()
    this.back()
  }


  back() {
    this.router.navigate(["../"], {relativeTo: this.route})
  }

  changeStatus(task: TaskInterface) {
    this.taskService.updateSubtask(this.taskId, task._id, task).subscribe(console.log)
  }
}
