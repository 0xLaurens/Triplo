import {ComponentFixture, TestBed} from '@angular/core/testing';

import {UserEditComponent} from './user-edit.component';
import {RouterTestingModule} from "@angular/router/testing";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {NgbDatepickerModule} from "@ng-bootstrap/ng-bootstrap";
import {gender} from "@triplo/models";

describe('UserEditComponent', () => {
  let component: UserEditComponent;
  let fixture: ComponentFixture<UserEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserEditComponent],
      imports: [CommonModule, RouterTestingModule, FormsModule, NgbDatepickerModule],
    }).compileComponents();


    fixture = TestBed.createComponent(UserEditComponent);
    component = fixture.componentInstance;
    component.user = {
      id: 1,
      firstname: "John",
      lastname: "Doe",
      username: "JohnDoe123",
      email: "John@Doe.com",
      dob: {year: 2012, month: 10, day: 17},
      registered: new Date(),
      gender: gender.male,
    }

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
})
;
