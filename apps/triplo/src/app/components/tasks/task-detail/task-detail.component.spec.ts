import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskDetailComponent } from './task-detail.component';
import {RouterTestingModule} from "@angular/router/testing";
import {TaskHttpService} from "../../../services/task/task-http.service";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {UserHttpService} from "../../../services/user/user-http.service";
import {ProjectHttpService} from "../../../services/projects/project-http.service";
import {AuthHttpService} from "../../../services/authentication/auth-http.service";
import {TuiAlertService} from "@taiga-ui/core";

describe('TaskDetailComponent', () => {
  let component: TaskDetailComponent;
  let fixture: ComponentFixture<TaskDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TaskDetailComponent],
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [TaskHttpService, UserHttpService, ProjectHttpService, AuthHttpService, TuiAlertService]
    }).compileComponents();

    fixture = TestBed.createComponent(TaskDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
