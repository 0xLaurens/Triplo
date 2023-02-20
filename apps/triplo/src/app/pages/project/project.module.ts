import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from "@angular/core";
import {ProjectOverviewComponent} from "./project-overview/project-overview.component";
import {ProjectCardListComponent} from "./project-card-list/project-card-list.component";
import {ProjectDetailComponent} from "./project-detail/project-detail.component";
import {ProjectEditComponent} from "./project-edit/project-edit.component";
import {ProjectHttpService} from "../../services/projects/project-http.service";
import {CommonModule} from "@angular/common";
import {RouterLink, RouterLinkWithHref, RouterOutlet} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {
  TuiAlertModule,
  TuiButtonModule, TuiErrorModule, TuiFormatDatePipeModule,
  TuiHintModule,
  TuiLinkModule,
  TuiRootModule, TuiSvgModule, TuiTextfieldControllerModule
} from "@taiga-ui/core";
import {
  TUI_VALIDATION_ERRORS, TuiAvatarModule, TuiBadgeModule,
  TuiFieldErrorPipeModule,
  TuiInputModule, TuiInputTagModule,
  TuiIslandModule, TuiMarkerIconModule, TuiTagModule,
  TuiTextAreaModule
} from "@taiga-ui/kit";
import {TaskModule} from "../../components/tasks/task.module";
import {CommentModule} from "../../components/comments/comment.module";
import {LikeHttpService} from "../../services/likes/like-http.service";
import {ProjectDetailOverviewComponent} from "./project-detail/project-detail-overview/project-detail-overview.component";
import {ProjectDetailMembersComponent} from "./project-detail/project-detail-members/project-detail-members.component";


@NgModule({
  declarations: [
    ProjectOverviewComponent,
    ProjectCardListComponent,
    ProjectDetailComponent,
    ProjectEditComponent,
    ProjectDetailOverviewComponent,
    ProjectDetailMembersComponent,
  ],
  exports: [
    ProjectOverviewComponent,
    ProjectCardListComponent,
    ProjectDetailComponent,
    ProjectEditComponent,
    ProjectDetailOverviewComponent,
    ProjectDetailMembersComponent,
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
    RouterOutlet,
    TuiAvatarModule,
    TuiBadgeModule,
  ],
  providers: [
    ProjectHttpService,
    LikeHttpService,
    {
      provide: TUI_VALIDATION_ERRORS,
      useValue: {
        email: `Enter a valid email`,
        required: `This Field is Required!`,
        passwordMatchingValidator: `Password needs to match`,
      },
    }
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class ProjectModule {
}
