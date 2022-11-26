import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectCardListComponent } from './project-card-list.component';
import {RouterTestingModule} from "@angular/router/testing";

describe('ProjectCardListComponent', () => {
  let component: ProjectCardListComponent;
  let fixture: ComponentFixture<ProjectCardListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProjectCardListComponent],
      imports: [RouterTestingModule],
      providers: []
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectCardListComponent);
    component = fixture.componentInstance;
    component.project = {DislikeCount: 0, LikeCount: 0, _id: "asdf", created: Date.prototype, description: "", name: ""}
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
