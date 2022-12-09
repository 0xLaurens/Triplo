import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import {FormBuilder, ReactiveFormsModule} from "@angular/forms";
import {AuthHttpService} from "../../../services/authentication/auth-http.service";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {TuiInputModule, TuiInputPasswordModule, TuiIslandModule, TuiTextAreaModule} from "@taiga-ui/kit";
import {TuiTextfieldControllerModule} from "@taiga-ui/core";

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [ HttpClientTestingModule, TuiIslandModule, TuiInputModule, TuiInputPasswordModule, ReactiveFormsModule, TuiTextfieldControllerModule, TuiTextAreaModule],
      providers: [FormBuilder, AuthHttpService],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
