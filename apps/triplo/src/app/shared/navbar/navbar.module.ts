import {NgModule} from "@angular/core";
import {NavbarComponent} from "./navbar.component";
import {TuiButtonModule} from "@taiga-ui/core";
import {RouterLink} from "@angular/router";
import {AsyncPipe, NgIf} from "@angular/common";
import {TuiSidebarModule} from "@taiga-ui/addon-mobile";
import {TuiActiveZoneModule} from '@taiga-ui/cdk';
import {TuiIslandModule} from "@taiga-ui/kit";

@NgModule({
  declarations: [NavbarComponent],
  exports: [NavbarComponent],
    imports: [
        TuiButtonModule,
        TuiActiveZoneModule,
        RouterLink,
        NgIf,
        AsyncPipe,
        TuiSidebarModule,
        TuiIslandModule
    ]
})

export class NavbarModule {}
