import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectDetailComponent } from './project-detail.component';
import {ProjectHttpService} from "../../../services/projects/project-http.service";
import {RouterTestingModule} from "@angular/router/testing";
import {CommentHttpService} from "../../../services/comments/comment-http.service";

describe('ProjectDetailComponent', () => {
  let component: ProjectDetailComponent;
  let fixture: ComponentFixture<ProjectDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProjectDetailComponent],
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [ProjectHttpService, CommentHttpService]
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
