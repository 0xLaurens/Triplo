import {Component, Inject, OnInit} from '@angular/core';
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
  status = [TaskStatus.TODO, TaskStatus.PROGRESS, TaskStatus.TESTING, TaskStatus.DONE]
  subtaskId: string;
  open = true;

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
    this.route.parent?.parent?.params.subscribe(params => this.projectId = params['projectId']);
    this.route.parent?.params.subscribe(params => this.taskId = params['taskId'])
    this.subtaskMode = this.route.snapshot.url.toString().includes("Subtask");
    this.createMode = this.route.snapshot.url.toString().includes("Create");
    this.setupForm();
  }

  setupForm() {
    const formControls = {
      name: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      description: new FormControl('', [Validators.required, Validators.maxLength(1000)]),
      status: new FormControl('')
    };
    this.form = this.fb.group(formControls)

    if (!this.createMode)
      this.taskService.getTaskById(this.taskId).subscribe(task => {
        this.form.patchValue({
          name: task.name,
          description: task.description,
          status: task.status
        })
      })
  }

  get f() {
    return this.form.controls;
  }

  onSubmit() {
    const changes: Partial<TaskInterface> = {
      ...this.form.value
    }

    this.loading = true;
    const taskMessage = this.subtaskMode ? "subtask" : "task";

    this.createMode ? changes.status = TaskStatus.TODO: changes.status;

    if (this.createMode && !this.subtaskMode)
      this.taskService.createTask(this.projectId, changes).subscribe(() => this.toast(`Created ${taskMessage}`));

    if (this.createMode && this.subtaskMode)
      this.taskService.createSubtask(this.projectId, this.taskId, changes).subscribe(() => this.toast(`Created ${taskMessage}`));

    if (!this.createMode && this.subtaskMode)
      this.taskService.updateSubtask(this.taskId, this.subtaskId, changes).subscribe(() => this.toast(`Updated ${taskMessage}`))

    if (!this.createMode && !this.subtaskMode)
      this.taskService.updateTask(this.taskId, changes).subscribe(() => this.toast(`Updated ${taskMessage}`))

  }

  toast(content: string) {
    this.loading = false;
    this.alertService.open(content, {label: "Success!"}).subscribe()
    this.close()
  }

  close() {
    this.router.navigate([`../`], {relativeTo: this.route})
  }
}
