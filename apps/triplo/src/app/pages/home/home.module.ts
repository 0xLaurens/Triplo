import {NgModule} from "@angular/core";
import {HeroComponent} from "./hero/hero.component";
import {TuiButtonModule} from "@taiga-ui/core";
import {RouterLink} from "@angular/router";

@NgModule({
  declarations: [HeroComponent],
  exports: [HeroComponent],
  imports: [
    TuiButtonModule,
    RouterLink
  ],
})

export class HomeModule {}
