import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentFormComponent } from './comment-form.component';
import {FormBuilder, ReactiveFormsModule} from "@angular/forms";
import {TuiInputModule} from "@taiga-ui/kit";
import {AuthHttpService} from "../../../services/authentication/auth-http.service";
import {CommentHttpService} from "../../../services/comments/comment-http.service";
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('CommentFormComponent', () => {
  let component: CommentFormComponent;
  let fixture: ComponentFixture<CommentFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CommentFormComponent],
      imports: [ReactiveFormsModule,HttpClientTestingModule, TuiInputModule],
      providers: [FormBuilder, AuthHttpService, CommentHttpService]
    }).compileComponents();

    fixture = TestBed.createComponent(CommentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
