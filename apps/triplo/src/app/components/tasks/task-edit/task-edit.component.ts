import {Component, Inject, OnInit} from '@angular/core';
import {TaskInterface, TaskStatus, UserInterface} from "@triplo/models";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {TuiAlertService, TuiNotification} from "@taiga-ui/core";
import {ActivatedRoute, Router} from "@angular/router";
import {TaskHttpService} from "../../../services/task/task-http.service";
import {ProjectHttpService} from "../../../services/projects/project-http.service";
import {debounceTime, distinctUntilChanged} from "rxjs";
import {UserHttpService} from "../../../services/user/user-http.service";

@Component({
  selector: 'triplo-task-edit',
  templateUrl: './task-edit.component.html',
})
export class TaskEditComponent implements OnInit {
  projectId: string;
  createMode: boolean;
  taskId!: string;
  form!: FormGroup
  loading = false
  subtaskMode = false;
  deleteMode = false;
  status = [TaskStatus.TODO, TaskStatus.PROGRESS, TaskStatus.TESTING, TaskStatus.DONE]
  subtaskId: string;
  taskMessage: string;
  open = true;
  users: UserInterface[]
  private tempUser: UserInterface;

  constructor(
    @Inject(TuiAlertService)
    private readonly alertService: TuiAlertService,
    private readonly taskService: TaskHttpService,
    private readonly userService: UserHttpService,
    private readonly projectService: ProjectHttpService,
    private readonly route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.route.parent?.parent?.params.subscribe(params => this.projectId = params['projectId']);
    this.route.parent?.params.subscribe(params => this.taskId = params['taskId'])
    this.route.params.subscribe(params => this.subtaskId = params['subtaskId'])
    this.subtaskMode = this.route.snapshot.url.toString().includes("Subtask");
    this.createMode = this.route.snapshot.url.toString().includes("Create");

    this.taskMessage = this.subtaskMode ? "subtask" : "task";
    this.setupForm();
  }

  setupForm() {
    const formControls = {
      name: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      description: new FormControl('', [Validators.required, Validators.maxLength(1000)]),
      status: new FormControl(TaskStatus.TODO, [Validators.required]),
      username: new FormControl(''),
      assigned: new FormControl('')
    };
    this.form = this.fb.group(formControls)

    if (!this.createMode && !this.subtaskMode)
      this.taskService.getTaskById(this.taskId).subscribe(task => {
        this.form.patchValue(task)
      })


    if (!this.createMode && this.subtaskMode)
      this.taskService.getSubtaskById(this.taskId, this.subtaskId).subscribe(parentTask => {
        this.form.patchValue(parentTask.subtasks[0])
      })

    this.projectService.findProjectById(this.projectId, true).subscribe(project => {
      const owner = project.ownerId as UserInterface
      this.users = [...project.members, owner]
    })
    this.form.valueChanges.pipe(debounceTime(250), distinctUntilChanged()).subscribe(search => this.searchUsers(search.username))
  }


  get f() {
    return this.form.controls;
  }

  onSubmit(): void {
    const changes: Partial<TaskInterface> = {
      name: this.form.value.name,
      description: this.form.value.description,
      status: this.form.value.status,
    }
    this.createMode ? changes.status = TaskStatus.TODO : changes.status;

    if (this.form.value.username && this.form.value.assigned) {
      this.userService.findUserById(this.form.value.assigned).subscribe(u => {
        if (u.username === this.form.value.username) {
          changes.username = u.username
          changes.assigned = this.form.value.assigned;
          this.updateTask(changes)
        } else {
          this.alertService.open('User is invalid!', {label: 'Invalid!', status: TuiNotification.Info})
            .subscribe()
          this.form.patchValue({assigned: ''})
          this.form.patchValue({username: ''})
        }
      })
    } else if (this.form.value.username && !this.form.value.assigned) {
      this.alertService.open('User is invalid!', {label: 'Invalid!', status: TuiNotification.Info})
        .subscribe()
      this.form.patchValue({assigned: ''})
      this.form.patchValue({username: ''})
    } else {
      this.updateTask(changes)
    }
  }

  updateTask(changes: Partial<TaskInterface>) {
    this.createMode ? changes.status = TaskStatus.TODO : changes.status;
    this.loading = true;
    if (this.createMode && !this.subtaskMode)
      this.taskService.createTask(this.projectId, changes).subscribe(() => this.toast(`Created ${this.taskMessage}`));

    if (this.createMode && this.subtaskMode)
      this.taskService.createSubtask(this.taskId, changes).subscribe(() => this.toast(`Created ${this.taskMessage}`));

    if (!this.createMode && this.subtaskMode)
      this.taskService.updateSubtask(this.taskId, this.subtaskId, changes).subscribe(() => this.toast(`Updated ${this.taskMessage}`))

    if (!this.createMode && !this.subtaskMode)
      this.taskService.updateTask(this.taskId, changes).subscribe(() => this.toast(`Updated ${this.taskMessage}`))
  }

  toast(content: string) {
    this.loading = false;
    this.alertService.open(content, {label: "Success!"}).subscribe()
    this.close()
  }

  close() {
    if (this.subtaskMode) {
      this.router.navigate([`../../`], {relativeTo: this.route})
    }

    if(!this.subtaskMode && this.deleteMode) {
      this.router.navigate([`../../`], {relativeTo: this.route})
    }

    if (!this.subtaskMode && !this.deleteMode)
      this.router.navigate([`../`], {relativeTo: this.route})
  }

  deleteTask() {
    if (this.subtaskMode && !this.createMode)
      this.taskService.deleteSubtask(this.taskId, this.subtaskId).subscribe(() => this.toast(`Deleted ${this.taskMessage}`))
    this.deleteMode = true

    if (!this.subtaskMode && !this.createMode)
      this.taskService.deleteTask(this.taskId).subscribe(() => this.toast(`Deleted ${this.taskMessage}`))
    this.deleteMode = true
  }

  private searchUsers(username: string) {
    this.projectService.findProjectById(this.projectId, true, username).subscribe(project => {
      const owner = project.ownerId as UserInterface
      this.users = []
      if (project.members)
        this.users.push(...project.members)
      if (owner)
        this.users.push(owner)
    })
  }

  onSelected(user: UserInterface): void {
    this.form.patchValue({assigned: user._id})
    this.form.patchValue({username: user.username})
  }
}
