import {NgModule} from "@angular/core";
import {TaskEditComponent} from "./task-edit/task-edit.component";
import {TaskDetailComponent} from "./task-detail/task-detail.component";
import {TaskCardComponent} from "./task-card/task-card.component";
import {
  TuiDataListWrapperModule,
  TuiFieldErrorPipeModule,
  TuiInputModule,
  TuiIslandModule,
  TuiMarkerIconModule, TuiSelectModule,
  TuiTagModule, TuiTextAreaModule
} from "@taiga-ui/kit";
import {AsyncPipe, DatePipe, NgClass, NgIf} from "@angular/common";
import {RouterLinkWithHref} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";
import {
  TuiButtonModule,
  TuiErrorModule,
  TuiHintModule,
  TuiSvgModule,
  TuiTextfieldControllerModule
} from "@taiga-ui/core";

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
    NgClass
  ],
  providers: [],
})

export class TaskModule {}
