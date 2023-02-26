import {NgModule} from "@angular/core";
import {MembersComponent} from "./members.component";
import {RouterLinkWithHref, RouterOutlet} from "@angular/router";
import {AsyncPipe, NgIf} from "@angular/common";
import {TuiButtonModule, TuiHintModule, TuiLinkModule, TuiSvgModule} from "@taiga-ui/core";
import {TuiAvatarModule, TuiBadgeModule, TuiIslandModule} from "@taiga-ui/kit";

@NgModule({
  declarations: [
    MembersComponent,
  ],
  exports: [
    MembersComponent
  ],
  imports: [
    RouterOutlet,
    AsyncPipe,
    RouterLinkWithHref,
    TuiButtonModule,
    TuiIslandModule,
    TuiAvatarModule,
    TuiLinkModule,
    NgIf,
    TuiBadgeModule,
    TuiSvgModule,
    TuiHintModule
  ],
  providers: [],
})

export class MembersModule {
}
