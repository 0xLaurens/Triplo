import { Component, OnInit } from '@angular/core';
import {TaskHttpService} from "../../../services/task/task-http.service";
import {ActivatedRoute, Router} from "@angular/router";
import {CommentInterface, TaskInterface} from "@triplo/models";
import {Observable} from "rxjs";

@Component({
  selector: 'triplo-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.css'],
})
export class TaskDetailComponent implements OnInit {
  task$!: Observable<TaskInterface>
  subTasks$!: Observable<TaskInterface[]>
  id!: string

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private taskService: TaskHttpService,
  ) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id']
    });

    this.task$ = this.taskService.findTaskById(this.id)
    // this.subTasks$ = this.taskService.getTopLevelComments(this.id)
  }

  deleteTask() {
    this.taskService.deleteTask(this.id).subscribe(
      p => {
        this.router.navigate(["/Tasks"])
      }
    )
  }

  back() {
    this.router.navigate(["/Tasks"])
  }
}
