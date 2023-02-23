import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {TaskInterface, TaskStatus} from "@triplo/models";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {TuiAlertService} from "@taiga-ui/core";
import {ActivatedRoute, Router} from "@angular/router";
import {TaskHttpService} from "../../../services/task/task-http.service";

@Component({
  selector: 'triplo-task-edit',
  templateUrl: './task-edit.component.html',
})
export class TaskEditComponent implements OnInit {
  projectId: string;
  createMode?: boolean;
  taskId!: string;
  form!: FormGroup
  loading = false
  subtaskMode = false;
  status = ["Todo", "In Progress", "Testing", "Done"]
  subtaskId: string;

  constructor(
    @Inject(TuiAlertService)
    private readonly alertService: TuiAlertService,
    private readonly taskService: TaskHttpService,
    private readonly route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.route.parent?.parent?.params.subscribe(params => {
      this.projectId = params['projectId']
    });
    this.subtaskMode = this.route.snapshot.url.toString().includes("Subtask");
    this.createMode = this.route.snapshot.url.toString().includes("Create");

    const formControls = {
      name: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]),
      description: new FormControl('', [Validators.required, Validators.maxLength(1000)]),
      status: new FormControl('')
    };
    this.form = this.fb.group(formControls)

    if (!this.createMode) {
      this.taskService.findTaskById(this.taskId)
        .subscribe(x => this.form.patchValue(x))
    }
  }

  get f() {
    return this.form.controls;
  }

  onSubmit() {
    const changes: Partial<TaskInterface> = {
      ...this.form.value
    }

    this.loading = true;

    let value = "task";
    if (this.subtaskMode) {
      value = "subtask"
    } else {
      changes.status = TaskStatus.Todo
    }

    if (this.createMode) {
      if (!this.subtaskMode) {
        this.taskService.createTask(this.projectId, changes).subscribe(
          () => {
            this.loading = false;
            this.alertService.open(`Created ${value}`, {label: "Success!"}).subscribe()
            this.router.navigate([`/Projects/${this.projectId}/Tasks`])
          }
        );
      } else {
        this.taskService.createSubTask(this.projectId, this.taskId, changes).subscribe(
          () => {
            this.loading = false;
            this.alertService.open(`Created ${value}`, {label: "Success!"}).subscribe()
            this.router.navigate([`/Projects/${this.projectId}/Tasks`])
          }
        );
      }
    } else if (!this.createMode) {
      this.taskService.updateTask(this.taskId, changes).subscribe(
        () => {
          this.loading = false;
          this.alertService.open(`Updated ${value}`, {label: "Success!"}).subscribe()
          this.router.navigate([`/Projects/${this.projectId}`])
        },
      )
    }
  }

  back() {
    if (this.subtaskMode) {
      this.router.navigate([`/Projects/${this.projectId}/Tasks/${this.taskId}`])
    } else {
      this.router.navigate([`/Projects/${this.projectId}`])
    }
  }
}
