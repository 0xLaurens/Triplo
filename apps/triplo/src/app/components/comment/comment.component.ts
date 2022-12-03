import {Component, Input, OnInit} from '@angular/core';
import {CommentInterface} from "@triplo/models";
import {CommentHttpService} from "../../services/comments/comment-http.service";
import {Observable} from "rxjs";

@Component({
  selector: 'triplo-comment',
  templateUrl: './comment.component.html',
})
export class CommentComponent implements OnInit {
  @Input() comment: CommentInterface
  replies$: Observable<CommentInterface[]>
  show = false;

  constructor(private commentService: CommentHttpService){
  }
  ngOnInit(): void {
    this.replies$ = this.commentService.getCommentReplies(this.comment._id);
  }

  showReplies() {
    this.show = !this.show
  }


}
