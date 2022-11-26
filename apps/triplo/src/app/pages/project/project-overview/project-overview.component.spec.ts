import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectOverviewComponent } from './project-overview.component';
import {ProjectHttpService} from "../../../services/projects/project-http.service";
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('ProjectOverviewComponent', () => {
  let component: ProjectOverviewComponent;
  let fixture: ComponentFixture<ProjectOverviewComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProjectOverviewComponent],
      imports: [HttpClientTestingModule],
      providers: [ProjectHttpService]
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
