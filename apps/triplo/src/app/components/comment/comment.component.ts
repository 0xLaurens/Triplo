import {Component, Input} from '@angular/core';
import {CommentInterface} from "@triplo/models";

@Component({
  selector: 'triplo-comment',
  templateUrl: './comment.component.html',
})
export class CommentComponent {
  @Input() comment: CommentInterface
}
