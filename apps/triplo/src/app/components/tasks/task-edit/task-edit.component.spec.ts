import {ComponentFixture, TestBed} from '@angular/core/testing';
import {TaskEditComponent} from './task-edit.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {TaskHttpService} from "../../../services/task/task-http.service";
import {RouterTestingModule} from "@angular/router/testing";
import {FormBuilder, ReactiveFormsModule} from "@angular/forms";
import {TuiFieldErrorPipeModule, TuiTextAreaModule} from "@taiga-ui/kit";
import {
  TuiAlertService,
  TuiErrorModule, TuiExpandModule,
} from "@taiga-ui/core";
import {NO_ERRORS_SCHEMA} from "@angular/core";
import {UserHttpService} from "../../../services/user/user-http.service";
import {ProjectHttpService} from "../../../services/projects/project-http.service";

describe('TaskEditComponent', () => {
  let component: TaskEditComponent;
  let fixture: ComponentFixture<TaskEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TaskEditComponent],
      imports: [HttpClientTestingModule, RouterTestingModule, ReactiveFormsModule, TuiFieldErrorPipeModule, TuiErrorModule, TuiExpandModule, TuiTextAreaModule],
      providers: [TaskHttpService, FormBuilder, TuiAlertService, UserHttpService, ProjectHttpService],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(TaskEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
