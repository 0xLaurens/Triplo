import {NgModule} from "@angular/core";
import {ProfileDetailComponent} from "./profile-overview/profile-detail/profile-detail.component";
import {CommonModule} from "@angular/common";
import {AuthHttpService} from "../../services/authentication/auth-http.service";
import {UserHttpService} from "../../services/user/user-http.service";
import {
    TuiAvatarModule, TuiBadgeModule,
    TuiDataListWrapperModule,
    TuiFieldErrorPipeModule,
    TuiInputModule, TuiIslandModule,
    TuiSelectModule
} from "@taiga-ui/kit";
import {
  TuiButtonModule,
  TuiErrorModule,
  TuiHintModule, TuiLinkModule,
  TuiSvgModule,
  TuiTextfieldControllerModule, TuiTooltipModule
} from "@taiga-ui/core";
import {RouterLink, RouterLinkWithHref, RouterOutlet} from "@angular/router";
import {ProfileSettingsComponent} from "./profile-settings/profile-settings.component";
import {ReactiveFormsModule} from "@angular/forms";
import {ProfileOverviewComponent} from "./profile-overview/profile-overview.component";
import {ProfileProjectsComponent} from "./profile-overview/profile-projects/profile-projects.component";
import {ProfileLikedComponent} from "./profile-overview/profile-liked/profile-liked.component";
import {ProfileInviteComponent} from "./profile-overview/profile-invites/profile-invite.component";

@NgModule({
  declarations: [ProfileDetailComponent, ProfileSettingsComponent, ProfileOverviewComponent, ProfileProjectsComponent, ProfileLikedComponent, ProfileInviteComponent],
  exports: [ProfileDetailComponent, ProfileSettingsComponent, ProfileOverviewComponent, ProfileProjectsComponent, ProfileLikedComponent, ProfileInviteComponent],
    imports: [
        CommonModule,
        TuiAvatarModule,
        TuiButtonModule,
        TuiHintModule,
        RouterLinkWithHref,
        TuiInputModule,
        ReactiveFormsModule,
        TuiTextfieldControllerModule,
        TuiSvgModule,
        TuiErrorModule,
        TuiFieldErrorPipeModule,
        RouterLink,
        RouterOutlet,
        TuiSelectModule,
        TuiDataListWrapperModule,
        TuiTooltipModule,
        TuiIslandModule,
        TuiLinkModule,
        TuiBadgeModule
    ],
  providers: [
    AuthHttpService,
    UserHttpService
  ],
})

export class ProfileModule {
}
