import {NgModule} from "@angular/core";
import {CommentComponent} from "./comment/comment.component";
import {CommentFormComponent} from "./comment-form/comment-form.component";
import {TuiDataListDropdownManagerModule, TuiInputModule, TuiIslandModule, TuiTagModule} from "@taiga-ui/kit";
import {AsyncPipe, DatePipe, NgForOf, NgIf} from "@angular/common";
import {TuiButtonModule, TuiDataListModule, TuiHostedDropdownModule, TuiLinkModule, TuiSvgModule} from "@taiga-ui/core";
import {ReactiveFormsModule} from "@angular/forms";
import {TuiActiveZoneModule} from "@taiga-ui/cdk";

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
    NgIf,
    AsyncPipe,
    NgForOf,
    TuiHostedDropdownModule,
    TuiDataListModule,
    TuiDataListDropdownManagerModule,
    TuiActiveZoneModule,
    TuiSvgModule
  ],
  exports: [
    CommentComponent,
    CommentFormComponent
  ]
})

export class CommentModule {}
