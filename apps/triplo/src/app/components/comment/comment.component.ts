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
  showReplyForm = false;

  constructor(private commentService: CommentHttpService) {
  }

  ngOnInit(): void {
    this.replies$ = this.commentService.getCommentReplies(this.comment._id);
  }

  showReplies() {
    this.show = !this.show
  }


  reply() {
    this.showReplyForm = !this.showReplyForm;
  }

  createReply($event: CommentInterface) {
    $event.username = "Monke"
    $event.owner = "638b2dd312a4cfd63a04ba40"
    $event.parent = this.comment._id
    this.commentService.createReply(this.comment.project, this.comment._id, $event).subscribe(() => {
      this.show = true
      this.cancelReply();
    });
  }

  cancelReply() {
    this.showReplyForm = false
  }
}