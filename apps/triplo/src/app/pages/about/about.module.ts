import {NgModule} from '@angular/core';
import {AboutUserstoriesComponent} from "./about-userstories/about-userstories.component";
import {AboutProjectComponent} from "./about-project/about-project.component";
import {AboutEntityComponent} from "./about-entity/about-entity.component";
import {AboutComponent} from "./about.component";

@NgModule({
  declarations: [
    AboutProjectComponent,
    AboutEntityComponent,
    AboutUserstoriesComponent,
  ],
  exports: [
    AboutProjectComponent,
    AboutEntityComponent,
    AboutUserstoriesComponent,
  ],
  imports: [],
  providers: [],
  bootstrap: [AboutComponent],
})
export class AboutModule {
}
