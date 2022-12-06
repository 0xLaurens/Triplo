import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentComponent } from './comment.component';
import {CommentHttpService} from "../../../services/comments/comment-http.service";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {TuiIslandModule, TuiTagModule} from "@taiga-ui/kit";

describe('CommentComponent', () => {
  let component: CommentComponent;
  let fixture: ComponentFixture<CommentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CommentComponent],
      imports: [HttpClientTestingModule, TuiTagModule, TuiIslandModule],
      providers: [CommentHttpService]
    }).compileComponents();

    fixture = TestBed.createComponent(CommentComponent);
    component = fixture.componentInstance;
    component.comment = {
      dislikeCount: 0, likeCount: 0, message: "none", owner: "none", project: "none", replyCount: 1, username: "asdf",
      _id: "asdf"
    }
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});