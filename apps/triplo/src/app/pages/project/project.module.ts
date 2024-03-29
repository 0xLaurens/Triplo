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
  TuiButtonModule, TuiDataListModule, TuiDialogModule, TuiErrorModule, TuiFormatDatePipeModule,
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
import {
  ProjectDetailOverviewComponent
} from "./project-detail/project-detail-overview/project-detail-overview.component";
import {ProjectDetailMembersComponent} from "./project-detail/project-detail-members/project-detail-members.component";
import {InviteHttpService} from "../../services/invites/invite-http.service";
import {UserHttpService} from "../../services/user/user-http.service";
import {ProjectDetailTasksComponent} from "./project-detail/project-detail-tasks/project-detail-tasks.component";
import {ProjectSettingsComponent} from "./project-settings/project-settings.component";
import {
  ProjectMembersInviteComponent
} from "./project-settings/project-member-management/project-members-invite/project-members-invite.component";
import {
  ProjectMembersManagementComponent
} from "./project-settings/project-member-management/project-members-management.component";
import {MembersModule} from "../../components/members/members.module";
import {TuiLetModule} from "@taiga-ui/cdk";


@NgModule({
  declarations: [
    ProjectOverviewComponent,
    ProjectCardListComponent,
    ProjectDetailComponent,
    ProjectEditComponent,
    ProjectDetailTasksComponent,
    ProjectDetailOverviewComponent,
    ProjectDetailMembersComponent,
    ProjectSettingsComponent,
    ProjectMembersInviteComponent,
    ProjectMembersManagementComponent,
  ],
  exports: [
    ProjectOverviewComponent,
    ProjectCardListComponent,
    ProjectDetailComponent,
    ProjectEditComponent,
    ProjectDetailOverviewComponent,
    ProjectDetailMembersComponent,
    ProjectSettingsComponent,
    ProjectMembersInviteComponent,
    ProjectDetailTasksComponent,
    ProjectMembersManagementComponent,
  ],
  imports: [
    MembersModule,
    TuiDialogModule,
    CommentModule,
    TaskModule,
    TuiRootModule,
    CommonModule,
    RouterLinkWithHref,
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
    TuiIslandModule,
    TuiLinkModule,
    TuiTagModule,
    RouterOutlet,
    TuiButtonModule,
    TuiHintModule,
    TuiInputModule,
    TuiTextfieldControllerModule,
    TuiSvgModule,
    TuiErrorModule,
    TuiFieldErrorPipeModule,
    TuiTextAreaModule,
    TuiInputTagModule,
    TuiAvatarModule,
    TuiDataListModule,
    TuiAlertModule,
    TuiLetModule,
  ],
  providers: [
    ProjectHttpService,
    InviteHttpService,
    UserHttpService,
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
