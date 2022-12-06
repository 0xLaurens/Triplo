import {Component, Inject, Input, OnInit} from '@angular/core';
import {TaskInterface} from "@triplo/models";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {TuiAlertService} from "@taiga-ui/core";
import {ActivatedRoute, Router} from "@angular/router";
import {TaskHttpService} from "../../../services/task/task-http.service";

@Component({
  selector: 'triplo-task-edit',
  templateUrl: './task-edit.component.html',
})
export class TaskEditComponent implements OnInit {
  @Input() projectId: string;
  createMode?: boolean;
  id!: string;
  form!: FormGroup
  loading = false

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
    this.id = this.route.snapshot.params['id'];
    this.createMode = !this.id;

    const formControls = {
      name: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]),
      description: new FormControl('', [Validators.required, Validators.maxLength(1000)]),
    };
    this.form = this.fb.group(formControls)

    if (!this.createMode) {
      this.taskService.findTaskById(this.id)
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

    if (this.createMode) {
      this.taskService.createTask(this.projectId, changes).subscribe(
        task => {
          this.loading = false;
          this.alertService.open('Updated task', {label: "Success!"}).subscribe()
          this.router.navigate([`/projects/${this.projectId}`])
        }
      );
    } else if (!this.createMode) {
      this.taskService.updateTask(this.id, changes).subscribe(
        task => {
          this.loading = false;
          this.alertService.open('Created task', {label: "Success!"}).subscribe()
          this.router.navigate([`/projects/${this.projectId}`])
        },
      )
    }
  }
}
