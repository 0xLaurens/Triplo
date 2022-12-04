import {ComponentFixture, TestBed} from '@angular/core/testing';

import {UserDetailComponent} from './user-detail.component';
import {RouterTestingModule} from "@angular/router/testing";
import {RouterLink} from "@angular/router";
import {UserService} from "../../../services/user/user.service";

describe('UserDetailComponent', () => {
  let component: UserDetailComponent;
  let fixture: ComponentFixture<UserDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserDetailComponent],
      imports: [RouterLink, RouterTestingModule],
      providers: [UserService],
    }).compileComponents();
    fixture = TestBed.createComponent(UserDetailComponent);
    component = fixture.componentInstance;


    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
