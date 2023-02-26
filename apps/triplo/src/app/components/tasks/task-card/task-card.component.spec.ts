import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TaskCardComponent} from './task-card.component';
import {RouterTestingModule} from "@angular/router/testing";
import {TuiIslandModule, TuiTagModule} from "@taiga-ui/kit";
import {TaskInterface, TaskStatus} from "@triplo/models";

describe('TaskCardComponent', () => {
  let component: TaskCardComponent;
  let fixture: ComponentFixture<TaskCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TaskCardComponent],
      imports: [RouterTestingModule, TuiIslandModule, TuiTagModule],
      providers: [],
    }).compileComponents();

    const task: TaskInterface = {
      assigned: "", created: new Date(), status: TaskStatus.TODO, subtasks: [], username: "",
      _id: "asdf", description: "asdf", name: "asdf", project: "adsf"
    }

    fixture = TestBed.createComponent(TaskCardComponent);
    component = fixture.componentInstance;
    component.task = task
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
