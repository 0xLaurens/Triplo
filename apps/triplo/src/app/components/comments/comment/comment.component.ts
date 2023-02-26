import {AfterContentChecked, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CommentInterface} from "@triplo/models";
import {CommentHttpService} from "../../../services/comments/comment-http.service";
import {Observable} from "rxjs";

@Component({
  selector: 'triplo-comment',
  templateUrl: './comment.component.html',
})
export class CommentComponent implements OnInit, AfterContentChecked {
  @Input() comment: CommentInterface
  @Input() user: string | null | undefined
  @Output() reload: EventEmitter<void> = new EventEmitter<void>();
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
    this.loadReplies();
    this.dropdownOpen = false;
  }

  ngAfterContentChecked(): void {
    this.changeDetector.detectChanges();
  }

  showReplies() {
    this.show = !this.show
  }

  loadReplies() {
    this.replies$.subscribe(comment => {
      if (comment.length > 0) {
        this.comment.replies = comment[0].replies
      }
    });
  }

  reply() {
    this.showReplyForm = !this.showReplyForm;
  }

  createReply($event: CommentInterface) {
    $event.parent = this.comment._id
    this.commentService.createReply(this.comment.project, this.comment._id, $event).subscribe(comment => {
      this.comment.replies.push(comment)
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
      this.commentUpdateChangedProperties(data)
      this.cancelEdit()
    })
  }

  commentUpdateChangedProperties(comment: CommentInterface) {
    this.comment.message = comment.message;
    this.comment.owner = comment.owner;
    this.comment.username = comment.username;
    this.comment.updated = comment.updated;
  }

  cancelEdit() {
    this.editMode = false;
  }

  deleteComment() {
    this.commentService.deleteComment(this.comment._id, this.comment).subscribe(response => {
      if (this.comment.replies && this.comment.replies.length < 1) {
        this.deleted = true
      } else {
        this.commentUpdateChangedProperties(response)
      }
      this.reload.emit()
    })
    this.closeDropdown()

  }

}
