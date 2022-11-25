import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {ProjectInterface} from "@triplo/models";
import {ProjectHttpService} from "../../../services/projects/project-http.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'triplo-project-edit',
  templateUrl: './project-edit.component.html',
  styles: [],
})
export class ProjectEditComponent implements OnInit {
  createMode?: boolean;
  id!: string;
  form!: FormGroup
  loading = false

  constructor(
    private readonly projectService: ProjectHttpService,
    private readonly route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.createMode = !this.id;

    const formControls = {
      name: new FormControl('', [Validators.required, Validators.minLength(4)]),
      description: new FormControl('', [Validators.required])
    };
    this.form = this.fb.group(formControls)

    if (!this.createMode) {
      this.projectService.findProjectById(this.id)
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
        project => {
          this.loading = false;
          this.router.navigate(["/Projects"])
        }
      );
    } else if (!this.createMode) {
      this.projectService.updateProject(this.id, changes).subscribe(
        project => {
          this.loading = false;
          this.router.navigate(["/Projects"])
        }
      )
    }
  }
}
