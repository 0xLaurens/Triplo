import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskDetailComponent } from './task-detail.component';
import {RouterTestingModule} from "@angular/router/testing";
import {TaskHttpService} from "../../../services/task/task-http.service";
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('TaskDetailComponent', () => {
  let component: TaskDetailComponent;
  let fixture: ComponentFixture<TaskDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TaskDetailComponent],
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [TaskHttpService]
    }).compileComponents();

    fixture = TestBed.createComponent(TaskDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
