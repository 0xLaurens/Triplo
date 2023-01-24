import {NgModule} from "@angular/core";
import {ProfileDetailComponent} from "./profile-detail/profile-detail.component";
import {CommonModule} from "@angular/common";
import {AuthHttpService} from "../../services/authentication/auth-http.service";
import {UserHttpService} from "../../services/user/user-http.service";
import {TuiAvatarModule} from "@taiga-ui/kit";
import {TuiButtonModule, TuiHintModule} from "@taiga-ui/core";
import {RouterLinkWithHref} from "@angular/router";

@NgModule({
  declarations: [ProfileDetailComponent],
  imports: [
    CommonModule,
    TuiAvatarModule,
    TuiButtonModule,
    TuiHintModule,
    RouterLinkWithHref
  ],
  exports: [ProfileDetailComponent],
  providers: [
    AuthHttpService,
    UserHttpService
  ],
})

export class ProfileModule {
}
