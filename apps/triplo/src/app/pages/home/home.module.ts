import {NgModule} from "@angular/core";
import {HeroComponent} from "./hero/hero.component";

@NgModule({
  declarations: [HeroComponent],
  exports: [HeroComponent],
  imports: [],
})

export class HomeModule {}
