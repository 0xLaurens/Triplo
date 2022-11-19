import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutComponent } from './about.component';
import {AboutProjectComponent} from "./about-project/about-project.component";
import {AboutUserstoriesComponent} from "./about-userstories/about-userstories.component";
import {AboutEntityComponent} from "./about-entity/about-entity.component";

describe('AboutComponent', () => {
  let component: AboutComponent;
  let fixture: ComponentFixture<AboutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AboutComponent, AboutProjectComponent, AboutUserstoriesComponent, AboutEntityComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
