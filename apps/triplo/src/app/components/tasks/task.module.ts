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
  TuiMarkerIconModule, TuiSelectModule,
  TuiTagModule, TuiTextAreaModule
} from "@taiga-ui/kit";
import {AsyncPipe, DatePipe, NgClass, NgForOf, NgIf} from "@angular/common";
import {RouterLink, RouterLinkWithHref, RouterOutlet} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";
import {
    TuiButtonModule, TuiDataListModule, TuiDialogModule,
    TuiErrorModule,
    TuiHintModule, TuiScrollbarModule,
    TuiSvgModule,
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
    TuiIslandModule,
    TuiTagModule,
    DatePipe,
    RouterLinkWithHref,
    TuiMarkerIconModule,
    AsyncPipe,
    ReactiveFormsModule,
    TuiInputModule,
    TuiHintModule,
    TuiTextfieldControllerModule,
    TuiErrorModule,
    TuiFieldErrorPipeModule,
    TuiTextAreaModule,
    TuiSvgModule,
    TuiButtonModule,
    NgIf,
    TuiDataListWrapperModule,
    TuiSelectModule,
    NgClass,
    RouterLink,
    NgForOf,
    TuiAutoFocusModule,
    TuiDialogModule,
    RouterOutlet,
    TuiScrollbarModule,
    TuiDataListModule,
    TuiAvatarModule
  ],
  providers: [],
})

export class TaskModule {}
