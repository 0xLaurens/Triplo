import {NgModule} from "@angular/core";
import {ProfileDetailComponent} from "./profile-detail/profile-detail.component";
import {CommonModule} from "@angular/common";
import {AuthHttpService} from "../../services/authentication/auth-http.service";
import {UserHttpService} from "../../services/user/user-http.service";
import {
    TuiAvatarModule,
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
import {ProfileProjectsComponent} from "./profile-projects/profile-projects.component";
import {ProfileLikedComponent} from "./profile-liked/profile-liked.component";

@NgModule({
  declarations: [ProfileDetailComponent, ProfileSettingsComponent, ProfileOverviewComponent, ProfileProjectsComponent, ProfileLikedComponent],
  exports: [ProfileDetailComponent, ProfileSettingsComponent, ProfileOverviewComponent, ProfileProjectsComponent, ProfileLikedComponent],
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
    TuiLinkModule
  ],
  providers: [
    AuthHttpService,
    UserHttpService
  ],
})

export class ProfileModule {
}
