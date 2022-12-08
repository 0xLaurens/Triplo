import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from "@angular/core";
import {ProjectOverviewComponent} from "./project-overview/project-overview.component";
import {ProjectCardListComponent} from "./project-card-list/project-card-list.component";
import {ProjectDetailComponent} from "./project-detail/project-detail.component";
import {ProjectEditComponent} from "./project-edit/project-edit.component";
import {ProjectHttpService} from "../../services/projects/project-http.service";
import {CommonModule} from "@angular/common";
import {RouterLink, RouterLinkWithHref} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {
  TuiAlertModule,
  TuiButtonModule, TuiErrorModule, TuiFormatDatePipeModule,
  TuiHintModule,
  TuiLinkModule,
  TuiRootModule, TuiSvgModule, TuiTextfieldControllerModule
} from "@taiga-ui/core";
import {
    TUI_VALIDATION_ERRORS,
    TuiFieldErrorPipeModule,
    TuiInputModule, TuiInputTagModule,
    TuiIslandModule, TuiMarkerIconModule, TuiTagModule,
    TuiTextAreaModule
} from "@taiga-ui/kit";
import {AppModule} from "../../app.module";
import {TaskModule} from "../../components/tasks/task.module";
import {CommentModule} from "../../components/comments/comment.module";

export function minLengthValidator(context: { requiredLength: string }): string {
  return `Minimum length — ${context.requiredLength}`;
}

export function maxLengthValidator(context: { requiredLength: string }): string {
  return `Max amount of tags — ${context.requiredLength}`;
}

@NgModule({
  declarations: [
    ProjectOverviewComponent,
    ProjectCardListComponent,
    ProjectDetailComponent,
    ProjectEditComponent
  ],
  exports: [
    ProjectOverviewComponent,
    ProjectCardListComponent,
    ProjectDetailComponent,
    ProjectEditComponent
  ],
  imports: [
    CommentModule,
    TaskModule,
    TuiRootModule,
    CommonModule,
    RouterLinkWithHref,
    FormsModule,
    ReactiveFormsModule,
    TuiAlertModule,
    TuiIslandModule,
    TuiLinkModule,
    TuiButtonModule,
    TuiHintModule,
    TuiTextfieldControllerModule,
    TuiInputModule,
    TuiSvgModule,
    TuiErrorModule,
    TuiFieldErrorPipeModule,
    TuiTextAreaModule,
    RouterLink,
    TuiTagModule,
    TuiInputTagModule,
    TuiFormatDatePipeModule,
    TuiMarkerIconModule,
  ],
  providers: [

    ProjectHttpService,
    {
      provide: TUI_VALIDATION_ERRORS,
      useValue: {
        required: `This Field is Required!`,
        minlength: minLengthValidator,
        maxlength: maxLengthValidator,
      },
    }
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class ProjectModule {
}
