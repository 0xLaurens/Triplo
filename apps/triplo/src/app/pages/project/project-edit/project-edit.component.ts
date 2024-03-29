import {Component, Inject, OnInit} from '@angular/core';
import {ProjectInterface} from "@triplo/models";
import {ProjectHttpService} from "../../../services/projects/project-http.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {TuiAlertService} from "@taiga-ui/core";

@Component({
  selector: 'triplo-project-edit',
  templateUrl: './project-edit.component.html',
  styles: [],
})
export class ProjectEditComponent implements OnInit {
  createMode?: boolean;
  form!: FormGroup
  loading = false
  projectId: string;

  constructor(
    @Inject(TuiAlertService)
    private readonly alertService: TuiAlertService,
    private readonly projectService: ProjectHttpService,
    private readonly route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.projectId = params['projectId']
    });
    this.createMode = !this.projectId;

    const formControls = {
      name: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]),
      description: new FormControl('', [Validators.required, Validators.maxLength(1000)]),
      Tags: new FormControl([], [Validators.maxLength(5)])
    };
    this.form = this.fb.group(formControls)

    if (!this.createMode) {
      this.projectService.findProjectById(this.projectId)
        .subscribe(x => this.form.patchValue(x))
    }
  }

  get f() {
    return this.form.controls;
  }

  onSubmit() {
    const changes: Partial<ProjectInterface> = {
      ...this.form.value
    }

    this.loading = true;

    if (this.createMode) {
      this.projectService.createProject(changes).subscribe(
        () => {
          this.loading = false;
          this.alertService.open('Created project', {label: "Success!"}).subscribe()
          this.router.navigate(["/Projects"])
        }
      );
    } else if (!this.createMode) {
      this.projectService.updateProject(this.projectId, changes).subscribe(
        () => {
          this.loading = false;
          this.alertService.open('Updated project', {label: "Success!"}).subscribe()
          this.router.navigate(["/Projects"])
        },
      )
    }
  }
}
