import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ProjectCardListComponent} from './project-card-list.component';
import {RouterTestingModule} from "@angular/router/testing";
import {NO_ERRORS_SCHEMA} from "@angular/core";

describe('ProjectCardListComponent', () => {
  let component: ProjectCardListComponent;
  let fixture: ComponentFixture<ProjectCardListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProjectCardListComponent],
      imports: [RouterTestingModule],
      schemas: [NO_ERRORS_SCHEMA],
      providers: []
    }).compileComponents();
    fixture = TestBed.createComponent(ProjectCardListComponent);
    component = fixture.componentInstance;
    component.project = {
      ownerId: "",
      Tags: ["Tag", "Tag2"], DislikeCount: 0, LikeCount: 0, _id: "asdf", created: Date.prototype, description: "", name: ""}
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
