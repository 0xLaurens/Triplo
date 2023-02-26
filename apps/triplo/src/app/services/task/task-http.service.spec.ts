import {TaskHttpService} from "./task-http.service";
import {TaskInterface, TaskStatus} from "@triplo/models";
import {TestBed, waitForAsync} from "@angular/core/testing";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";

describe("TaskHttpService", () => {
  let taskService: TaskHttpService
  let httpMock: HttpTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TaskHttpService]
    })

    taskService = TestBed.inject(TaskHttpService)
    httpMock = TestBed.inject(HttpTestingController)
  });

  afterEach(() => {
    httpMock.verify();
  });

  const dummyTasks: TaskInterface[] = [
    {
      _id: "a3dr-2dxe-3dzc-nDsa",
      name: "Refactor codebase",
      description: "Codebase has to be refactored in order to get a good grade",
      status: TaskStatus.TODO,
      subtasks: [],
      username: "Johnathan",
      created: new Date,
      project: "1",
      assigned: "ase4-6hfg-vcs2-dXCb",
    },
    {
      _id: "cx3r-2dde-ndDz-saa3",
      name: "remake erd",
      description: "The ERD has to be updated, its deprecated",
      status: TaskStatus.TESTING,
      subtasks: [],
      username: "Fritzmeister!",
      created: new Date,
      project: "1",
      assigned: "6hgf-eas4-dCcb-vsX2",
    },
    {
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
    },
  ]

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


  it("should retrieve all the tasks of a project", waitForAsync(() => {
    taskService.getTasksByProjectId("1").subscribe((tasks) => {
      expect(tasks.length).toEqual(3)
      expect(tasks).toEqual(dummyTasks)
    })

    const req = httpMock.expectOne('api/projects/1/tasks')
    expect(req.request.method).toEqual('GET')
    req.flush(dummyTasks)
  }));

  it("should get the task by Id", waitForAsync(() => {
    taskService.getTaskById("1").subscribe((task) => {
      expect(task).toEqual(dummyTask)
    })

    const req = httpMock.expectOne('api/tasks/1')
    expect(req.request.method).toEqual('GET')
    req.flush(dummyTask)
  }));

  it("should create a new task", waitForAsync(() => {
    taskService.createTask("1", dummyTask).subscribe((task) => {
      expect(task).toEqual(dummyTask)
    })

    const req = httpMock.expectOne('api/projects/1/tasks')
    expect(req.request.method).toEqual('POST')
    req.flush(dummyTask)
  }));

  it("should update a task", waitForAsync(() => {
    const updatedDummyTask = dummyTask
    updatedDummyTask.status = TaskStatus.PROGRESS

    taskService.updateTask('taskId', updatedDummyTask).subscribe((task) => {
      expect(task).toEqual(updatedDummyTask)
      expect(task.status).toEqual(TaskStatus.PROGRESS)
    })

    const req = httpMock.expectOne('api/tasks/taskId')
    expect(req.request.method).toEqual('PUT')
    req.flush(updatedDummyTask)
  }));

  it("should delete a task", waitForAsync(() => {
    taskService.deleteTask('taskId').subscribe((task) => {
      expect(task).toEqual(dummyTask)
    })

    const req = httpMock.expectOne('api/tasks/taskId')
    expect(req.request.method).toEqual('DELETE')
    req.flush(dummyTask)
  }));

  it("should find subtask by id", waitForAsync(() => {
    taskService.getSubtaskById('taskId', 'subtaskId').subscribe((task) => {
      expect(task).toEqual(dummyTask)
    })

    const req = httpMock.expectOne('api/tasks/taskId/subtask/subtaskId')
    expect(req.request.method).toEqual('GET')
    req.flush(dummyTask)
  }));

  it("should create subtask", waitForAsync(() => {
    taskService.createSubtask('taskId', dummyTask.subtasks[0]).subscribe((task) => {
      expect(task).toEqual(dummyTask.subtasks[0])
    })

    const req = httpMock.expectOne('api/tasks/taskId/subtask/')
    expect(req.request.method).toEqual('POST')
    req.flush(dummyTask.subtasks[0])
  }));

  it("should update subtask", waitForAsync(() => {
    taskService.updateSubtask('taskId', 'subtaskId', dummyTask.subtasks[0]).subscribe((task) => {
      expect(task).toEqual(dummyTask.subtasks[0])
    })

    const req = httpMock.expectOne('api/tasks/taskId/subtask/subtaskId')
    expect(req.request.method).toEqual('PUT')
    req.flush(dummyTask.subtasks[0])
  }));

  it("should delete subtask", waitForAsync(() => {
    taskService.deleteSubtask('taskId', 'subtaskId').subscribe((task) => {
      expect(task).toEqual(dummyTask.subtasks[0])
    })

    const req = httpMock.expectOne('api/tasks/taskId/subtask/subtaskId')
    expect(req.request.method).toEqual('DELETE')
    req.flush(dummyTask.subtasks[0])
  }));
})
