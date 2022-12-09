import {NgModule} from "@angular/core";
import {CommentComponent} from "./comment/comment.component";
import {CommentFormComponent} from "./comment-form/comment-form.component";
import {TuiInputModule, TuiIslandModule, TuiTagModule} from "@taiga-ui/kit";
import {DatePipe, NgIf} from "@angular/common";
import {TuiButtonModule, TuiLinkModule} from "@taiga-ui/core";
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    CommentComponent,
    CommentFormComponent,
  ],
  imports: [
    TuiIslandModule,
    TuiTagModule,
    DatePipe,
    TuiLinkModule,
    TuiButtonModule,
    ReactiveFormsModule,
    TuiInputModule,
    NgIf
  ],
  exports: [
    CommentComponent,
    CommentFormComponent
  ]
})

export class CommentModule {}
