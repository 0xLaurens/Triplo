import {ComponentFixture, TestBed} from '@angular/core/testing';

import {UserDetailComponent} from './user-detail.component';
import {RouterTestingModule} from "@angular/router/testing";
import {gender} from "@triplo/models";
import {RouterLink} from "@angular/router";

describe('UserDetailComponent', () => {
  let component: UserDetailComponent;
  let fixture: ComponentFixture<UserDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserDetailComponent],
      imports: [RouterLink, RouterTestingModule],
    }).compileComponents();
    fixture = TestBed.createComponent(UserDetailComponent);
    component = fixture.componentInstance;


    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
