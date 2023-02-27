import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {TaskEditComponent} from './task-edit.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {TaskHttpService} from "../../../services/task/task-http.service";
import {RouterTestingModule} from "@angular/router/testing";
import {FormBuilder, ReactiveFormsModule} from "@angular/forms";
import {TuiFieldErrorPipeModule, TuiTextAreaModule} from "@taiga-ui/kit";
import {
  TuiAlertService, TuiDialogModule,
  TuiErrorModule, TuiExpandModule,
} from "@taiga-ui/core";
import {UserHttpService} from "../../../services/user/user-http.service";
import {ProjectHttpService} from "../../../services/projects/project-http.service";
import {TaskInterface, TaskStatus} from "@triplo/models";
import {of} from "rxjs";
import {ActivatedRoute} from "@angular/router";

describe('TaskEditComponent', () => {
  let component: TaskEditComponent;
  let fixture: ComponentFixture<TaskEditComponent>;

  const dummyTask: TaskInterface = {
    _id: "bv3d-2egf-ndDz-saa3",
    name: "Rust rewrite",
    description: "Rewrite the project to rust!",
    status: TaskStatus.TODO,
    subtasks: [
      {
        _id: "bv3d-2egf-ndDz-saa3",
        name: "network driver",
        description: "The network driver has to be rewritten",
        status: TaskStatus.TODO,
        created: new Date,
        subtasks: [],
        project: "cx3r-d3as-eDSe-ds1a",
        username: "",
        assigned: "",
      }
    ],
    username: "Linus Torvalds",
    created: new Date,
    project: "1",
    assigned: "as9d-e6h4-dCcb-vsX2",
  }

  const taskServiceMock = {
    getTaskById: jest.fn().mockImplementation(() => of(dummyTask)),
    getSubtaskById: jest.fn().mockImplementation(() => of(dummyTask)),
    createTask: jest.fn(),
    createSubtask: jest.fn(),
    updateSubtask: jest.fn(),
    updateTask: jest.fn(),
    deleteSubtask: jest.fn(),
    deleteTask: jest.fn(),
  }

  const activatedRouteMock = {
    snapshot: {url: 'Create'},
    params: of({}),
    parent: {
      parent: {
        params: of({}),
      },
      params: of({}),
    }
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TaskEditComponent],
      imports: [HttpClientTestingModule, RouterTestingModule, ReactiveFormsModule,
        TuiFieldErrorPipeModule, TuiErrorModule, TuiExpandModule, TuiTextAreaModule, TuiDialogModule],
      providers: [FormBuilder, TuiAlertService, UserHttpService, ProjectHttpService,
        {
          provide: TaskHttpService,
          useValue: taskServiceMock,
        }, {provide: ActivatedRoute, useValue: activatedRouteMock}
      ],
    }).compileComponents();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('setupForm', () => {


    describe('setupForm (edit mode && subtask mode)', () => {
      beforeEach(() => {
        activatedRouteMock.parent.params = of({taskId: "taskId"})
        activatedRouteMock.params = of({subtaskId: "subtaskId"})
        activatedRouteMock.snapshot.url = "Subtask"

        fixture = TestBed.createComponent(TaskEditComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
      })

      it('Should call getSubtaskById', () => {
        expect(taskServiceMock.getSubtaskById).toHaveBeenCalled()
        expect(taskServiceMock.getSubtaskById).toHaveBeenCalledWith("taskId", "subtaskId")
        expect(taskServiceMock.getSubtaskById).toHaveBeenCalledTimes(1)
      })

      it('Should fill the form with the data from getSubtaskId', waitForAsync(() => {
        const dummyForm = {
          name: dummyTask.subtasks[0].name,
          description: dummyTask.subtasks[0].description,
          status: dummyTask.subtasks[0].status,
          username: dummyTask.subtasks[0].username,
          assigned: dummyTask.subtasks[0].assigned,
        }
        expect(component.form)
        expect(component.form.value).toEqual(dummyForm)
      }))
    });

    describe('setupForm (create mode && task mode)', () => {
      beforeEach(() => {
        activatedRouteMock.snapshot.url = "Create"

        fixture = TestBed.createComponent(TaskEditComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
      })

      it('Should not call getTaskById', () => {
        expect(taskServiceMock.getTaskById).toHaveBeenCalledTimes(0)
      })

      it('Should fill the form with the data from getTaskId', waitForAsync(() => {
        const dummyForm = {
          name: "",
          description: "",
          status: TaskStatus.TODO,
          username: "",
          assigned: "",
        }
        expect(component.form)
        expect(component.form.value).toEqual(dummyForm)
      }))
    });

    describe('setupForm (edit mode && task mode)', () => {
      beforeEach(() => {
        activatedRouteMock.snapshot.url = "url"
        activatedRouteMock.parent.params = of({taskId: "taskId"})

        fixture = TestBed.createComponent(TaskEditComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
      })

      it('Should not call getTaskById', () => {
        expect(taskServiceMock.getTaskById).toHaveBeenCalledTimes(1)
        expect(taskServiceMock.getTaskById).toHaveBeenCalledWith("taskId")
      })

      it('Should fill the form with the data from getTaskId', waitForAsync(() => {
        const dummyForm = {
          name: dummyTask.name,
          description: dummyTask.description,
          status: TaskStatus.TODO,
          username: dummyTask.username,
          assigned: dummyTask.assigned,
        }
        expect(component.form)
        expect(component.form.value).toEqual(dummyForm)
      }))
    });

    describe('setupForm (create mode && subtask mode)', () => {
      beforeEach(() => {
        activatedRouteMock.snapshot.url = "Subtask"

        fixture = TestBed.createComponent(TaskEditComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
      })

      it('Should not call getSubtaskById', () => {
        expect(taskServiceMock.getSubtaskById).toHaveBeenCalledTimes(0)
      })

      it('Should fill the form with the data from getSubtaskId', waitForAsync(() => {
        const dummyForm = {
          name: "",
          description: "",
          status: TaskStatus.TODO,
          username: "",
          assigned: "",
        }
        expect(component.form)
        expect(component.form.value).toEqual(dummyForm)
      }))
    });
  });
});
