import {AfterContentChecked, ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {CommentInterface, UserInterface} from "@triplo/models";
import {CommentHttpService} from "../../../services/comments/comment-http.service";
import {Observable} from "rxjs";

@Component({
  selector: 'triplo-comment',
  templateUrl: './comment.component.html',
})
export class CommentComponent implements OnInit, AfterContentChecked {
  @Input() comment: CommentInterface
  @Input() user: string | null | undefined
  dropdownOpen: boolean;
  replies$: Observable<CommentInterface[]>
  show = false;
  showReplyForm = false;
  editMode = false;
  deleted = false;

  constructor(private commentService: CommentHttpService,
              private changeDetector: ChangeDetectorRef,) {
  }

  ngOnInit(): void {
    this.replies$ = this.commentService.getCommentReplies(this.comment._id);
    this.dropdownOpen = false;
  }

  ngAfterContentChecked(): void {
    this.changeDetector.detectChanges();
  }

  showReplies() {
    this.show = !this.show
  }


  reply() {
    this.showReplyForm = !this.showReplyForm;
  }

  createReply($event: CommentInterface) {
    $event.parent = this.comment._id
    this.commentService.createReply(this.comment.project, this.comment._id, $event).subscribe(() => {
      this.show = true
      this.cancelReply();
    });
  }

  private closeDropdown(): void {
    this.dropdownOpen = false
  }

  cancelReply(): void {
    this.showReplyForm = false
  }

  editComment(): void {
    this.closeDropdown()
    this.editMode = true;
  }

  updateComment($event: CommentInterface) {
    this.commentService.updateComment(this.comment._id, $event).subscribe(data => {
      this.comment = data
      this.cancelEdit()
    })
  }

  cancelEdit() {
    this.editMode = false;
  }

  deleteComment() {
    this.commentService.deleteComment(this.comment._id).subscribe(() => {
      this.deleted = true
    })
    this.closeDropdown()
  }
}
