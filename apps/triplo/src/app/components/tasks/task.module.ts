import {NgModule} from "@angular/core";
import {TaskEditComponent} from "./task-edit/task-edit.component";
import {TaskDetailComponent} from "./task-detail/task-detail.component";
import {TaskCardComponent} from "./task-card/task-card.component";
import {
  TuiAvatarModule,
  TuiDataListWrapperModule,
  TuiFieldErrorPipeModule,
  TuiInputModule,
  TuiIslandModule,
  TuiSelectModule,
  TuiTagModule, TuiTextAreaModule
} from "@taiga-ui/kit";
import {AsyncPipe, DatePipe, NgClass, NgForOf, NgIf} from "@angular/common";
import {RouterLinkWithHref, RouterOutlet} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";
import {
    TuiButtonModule, TuiDataListModule, TuiDialogModule,
    TuiErrorModule,
    TuiHintModule, TuiLinkModule,
    TuiTextfieldControllerModule
} from "@taiga-ui/core";
import {TuiAutoFocusModule} from "@taiga-ui/cdk";

@NgModule({
  declarations: [
    TaskEditComponent,
    TaskDetailComponent,
    TaskCardComponent
  ],
  exports: [
    TaskEditComponent,
    TaskDetailComponent,
    TaskCardComponent,
  ],
  imports: [
    TuiDialogModule,
    ReactiveFormsModule,
    TuiButtonModule,
    NgIf,
    TuiHintModule,
    TuiInputModule,
    TuiAutoFocusModule,
    TuiErrorModule,
    TuiFieldErrorPipeModule,
    AsyncPipe,
    TuiTextAreaModule,
    TuiTextfieldControllerModule,
    TuiSelectModule,
    TuiDataListWrapperModule,
    TuiDataListModule,
    NgForOf,
    TuiAvatarModule,
    NgClass,
    TuiTagModule,
    RouterLinkWithHref,
    TuiLinkModule,
    TuiIslandModule,
    RouterOutlet,
    DatePipe
  ],
  providers: [],
})

export class TaskModule {}
