import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectEditComponent } from './project-edit.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {ProjectHttpService} from "../../../services/projects/project-http.service";
import {RouterTestingModule} from "@angular/router/testing";
import {FormBuilder, ReactiveFormsModule} from "@angular/forms";

describe('ProjectEditComponent', () => {
  let component: ProjectEditComponent;
  let fixture: ComponentFixture<ProjectEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProjectEditComponent],
      imports: [HttpClientTestingModule, RouterTestingModule, ReactiveFormsModule],
      providers: [ProjectHttpService, FormBuilder]
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
